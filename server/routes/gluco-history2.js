// Gluco-Hystory2 no se conecta a la BBDD, obtiene los datos directamente del archivo glucosity.json
// Para crear el archivo glucosity.json se debe ejecutar create-json.js
const express = require("express");
const Usuario = require("../models/usuario");
const app = express();
const hbs = require("hbs");
const addZero = require("../../utils/tools").addZero;
const moment = require("moment");
const _ = require("lodash");
const gl = require("../../public/assets/glucosity.json");

hbs.registerPartials(__dirname + "/views/partials");

hbs.registerHelper("glucoList", (items, options) => {
  let out = '<ul id="gluco-container" class="list-unstyled">';

  for (const key in items) {
    out += "<li class='card-wrapper-list col-8'>";
    if (items.hasOwnProperty(key)) {
      const line = items[key];

      out += '<div  class="card-header-date">';
      out += key;
      out += "</div>";

      line.forEach((v, i) => {
        if (v.layout) out += v.layout;
      });
    }
    out += "</li>";
  }
  return out;
});

const glucosity = new Promise((resolve, reject) => {
  /*Usuario.find({ email: "oscar1@oxkr.es" }).exec((err, usuario) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        reject: err
      });
    }
    resolve(usuario[0].glucoData);
  });*/
  if (gl) {
    resolve(gl);
  }
});

app.get("/glucohistory2", (req, res) => {
  glucosity.then(data => {
    let newData = data.map((line, idx) => {
      return {
        date: moment(line.time).format("L"),
        time:
          addZero(moment(line.time).hours()) +
          ":" +
          addZero(moment(line.time).minutes()),
        value: line.value
      };
    });

    newData = _.chain(newData)
      .groupBy("date")
      .value();

    for (const key in newData) {
      if (newData.hasOwnProperty(key)) {
        const line = newData[key];
        let average = 0;
        line.map((v, i) => {
          average += v.value;
        });
        line.push({ average: Math.floor(average / line.length) });

        let out = "";
        line.forEach((v, i) => {
          if (v.value) {
            let glucoAlert = "";
            if (v.value > 180) {
              glucoAlert = "gluco-high";
            } else if (v.value < 80) {
              glucoAlert = "gluco-low";
            }
            out += "<div class='sample'>";
            out += v.time;
            out += " | ";
            out += ` <span class="sample-value ${glucoAlert}"> `;
            out += v.value;
            out += "</span>";
            out += "</div>";
          }
          if (v.average) {
            out += `<span class="day-average ${
              v.average > 180 ? "gluco-high" : ""
            }"><small>avg/day</small><br>${v.average}</span`;
          }
        });
        line.push({ layout: out });
      }
    }
    res.render("../views/glucohistory2", {
      ok: true,
      data: newData
    });
  });
});

module.exports = app;
