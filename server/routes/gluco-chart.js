const express = require('express');
const Usuario = require('../models/usuario');
const app = express();
const hbs = require('hbs');
const Chart = require('chart.js');

//hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('glucoChart', (items) => {
    //console.log(items)
    let resultDates = [];
    let resultValues = [];
    let out = '<ul id="gluco-container" class="list-unstyled">';
    items.forEach((item, idx) => {
        let sampleDate = item.time ? item.time.replace(/-/g, '/').split(' ') : '0';
        let sampleValue = Number(item.value);
        if (sampleValue > 0) {
            resultValues.push(sampleValue);
        }
        resultDates.push(sampleDate[0]);
        out += JSON.stringify(sampleDate[0]);
    })
    out += '</ul>';

    let graph = `<canvas id="gluco-chart" width="400" height="400" data-dates="${resultDates}" data-values="${resultValues}"></canvas>`;

    return graph;
})

app.get('/gluco-chart', (req, res) => {
    Usuario.findOne({})
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.render('../views/gluco-chart', {
                ok: true,
                data: usuarios.glucoData
            });
        })
})

module.exports = app;