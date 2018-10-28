const express = require('express');
const Usuario = require('../models/usuario');
const app = express();
const hbs = require('hbs');
const dateToTimestamp = require('../../utils/tools').dateToTimestamp;
const getWeekday = require('../../utils/tools').getWeekday;

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('glucoList', (items, options) => {

    var out = '<ul id="gluco-container" class="list-unstyled">';
    var lastDate = '01/01/1970';
    items.forEach((item, idx) => {

        const itemDay = item.time ? item.time.replace(/-/g, '/').split(' ') : '0';
        const isSameDay = dateToTimestamp(lastDate) == dateToTimestamp(itemDay[0]);
        const isLowerDay = dateToTimestamp(lastDate) < dateToTimestamp(itemDay[0]);
        const glucoValue = Number(item.value);
        let glucoAlert = '';
        if (glucoValue > 180) {
            glucoAlert = 'gluco-high';
        } else if (glucoValue < 80) {
            glucoAlert = 'gluco-low';
        }


        if (idx > 1) {
            if (idx == 2){
                for (let index = 0; index < getWeekday(dateToTimestamp(itemDay[0])); index++) {
                    out += '<li class="card-wrapper"></li>';
                }
            }
            out += isLowerDay ? '<li class="card-wrapper"><div class="card">' : '';
            out += isLowerDay ? '<div class="card-header">' + itemDay[0] + '</div>' : '';
            out += isLowerDay || isSameDay ? '<div>' + itemDay[1] + ' => <span class="' + glucoAlert + '">' + glucoValue + '</span></div>' : '';
            out += isLowerDay ? (isSameDay ? '</div></li>' : '') : '';
        }

        lastDate = itemDay[0];
    })
    return out += '</ul>';
})

app.get('/glucohistory', (req, res) => {
    Usuario.findOne({})
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.render('../views/glucohistory', {
                ok: true,
                data: usuarios.glucoData
            });
        })
})

module.exports = app;