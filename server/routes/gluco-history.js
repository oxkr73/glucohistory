const express = require('express');
const Usuario = require('../models/usuario');
const app = express();
const hbs = require('hbs');
const getWeekday = require('../../utils/tools').getWeekday;

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('glucoList', (items, options) => {

    var out = '<ul id="gluco-container" class="list-unstyled">';
    var lastDate = new Date('1970-01-01');
    items.forEach((item, idx) => {

        const itemDay = item.time;
        const fullDate = itemDay.getDate() + '/' + (itemDay.getMonth() + 1) + '/' + itemDay.getFullYear();
        const isSameDay = lastDate.getDay() == itemDay.getDay();
        const notSameDay = lastDate.getDay() != itemDay.getDay();
        const glucoValue = Number(item.value);
        let glucoAlert = '';
        if (glucoValue > 180) {
            glucoAlert = 'gluco-high';
        } else if (glucoValue < 80) {
            glucoAlert = 'gluco-low';
        }

        if (idx == 0) {
            for (let index = 1; index < getWeekday(itemDay.getTime()); index++) {
                out += '<li class="card-wrapper"></li>';
            }
        }
        out += notSameDay ? '<li class="card-wrapper"><div class="card">' : '';
        out += notSameDay ? '<div class="card-header">' + fullDate + '</div>' : '';
        out += '<div>' + itemDay.getHours() + ':' + itemDay.getMinutes() + ' => <span class="' + glucoAlert + '">' + glucoValue + '</span></div>';
        out += notSameDay ? (isSameDay ? '</div></li>' : '') : '';

        lastDate = itemDay;
    })
    return out += '</ul>';
})

app.get('/glucohistory', (req, res) => {
    Usuario.find({ email: "oscar1@oxkr.es" })
        .exec((err, usuario) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.render('../views/glucohistory', {
                ok: true,
                data: usuario[0].glucoData
            });
        })
})

module.exports = app;