const express = require('express');
const Usuario = require('../models/usuario');
const app = express();
const hbs = require('hbs');

//hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('glucoChart', (items) => {
    let resultDates = [];
    let resultValues = [];

    items.forEach((item, idx) => {
        let sampleDate = item.time;
        let sampleValue = Number(item.value);
        if (sampleValue > 0) {
            resultValues.push(sampleValue);
        }
        resultDates.push(sampleDate);
    })

    let graph = `<canvas id="gluco-chart" width="1000" height="600" data-dates="${resultDates}" data-values="${resultValues}"></canvas>`;

    return graph;
})

app.get('/gluco-chart', (req, res) => {
    /*Usuario.aggregate([
    {$match:{
        email:"oscar1@oxkr.es"
        }},
    {$project:{
        glucoData:{
            $filter:{
                input:"$glucoData",
                as:"date",
                cond: {
                    $gt:["$$date.time", new Date("2018-09-01")]
                    }
                }
            }
        }}
    ])*/
    Usuario.find({ email: "oscar1@oxkr.es" })
        .exec((err, usuario) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            //console.log(usuario[0])
            res.render('../views/gluco-chart', {
                ok: true,
                data: usuario[0].glucoData
            });
        })
})

module.exports = app;