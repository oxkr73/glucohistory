const express = require('express')
const fs = require('fs')
const app = express()

const hbs = require('hbs');

const csvToArray = require('./utils/tools').csv_to_array;
const dateToTimestamp = require('./utils/tools').dateToTimestamp;
const getWeekday = require('./utils/tools').getWeekday;

const csvFile = './public/assets/oscarcastel_18-09-2018.csv';

let result = 'nothing';

function glucoDay(day, gluco) {
    this.day = day;
    this.gluco = gluco;
};

fs.readFile(csvFile, { encoding: 'utf8' }, (err, data) => {
    if (err) {
        throw new Error('Error: ' + err)
    }

    result = data.trim();
    result = csvToArray(result, ',');
    let days = [];

    for (let index = 0; index < result.length; index++) {
        const element = result[index];
        days.push(new glucoDay(element[2], element[14] || null))
    }
    return result = days;
});

app.use(express.static(__dirname + '/public'))

// HBS engine for Express
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

// HBS Helpers
hbs.registerHelper('glucoList', (items, options) => {

    var out = '<ul id="gluco-container" class="list-unstyled">';
    var lastDate = '01/01/1970';
    items.forEach((item, idx) => {
        const itemDay = item.day ? item.day.replace(/-/g, '/').split(' ') : '0';
        const isSameDay = dateToTimestamp(lastDate) == dateToTimestamp(itemDay[0]);
        const isLowerDay = dateToTimestamp(lastDate) < dateToTimestamp(itemDay[0]);
        let glucoAlert = '';
        if (item.gluco > 180) {
            glucoAlert = 'gluco-high';
        } else if (item.gluco < 80) {
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
            out += isLowerDay || isSameDay ? '<div>' + itemDay[1] + ' => <span class="' + glucoAlert + '">' + item.gluco + '</span></div>' : '';
            out += isLowerDay ? (isSameDay ? '</div></li>' : '') : '';
        }

        lastDate = itemDay[0];
    })
    return out += '</ul>';
})

app.get('/', (req, res) => {
    let requestGluco = req.query;
    let glucoData;

    if(requestGluco.readGluco == 'true'){
        glucoData = JSON.stringify(result);
    }

    res.render('../views/home', {
        owner: 'by OXKR',
        data: glucoData
    })
})

app.get('/glucohistory', (req, res) => {
    res.render('../views/glucohistory', {
        data: result
    });
})

app.get('/gluco-chart', (req, res) => {
    //console.log(result);
    res.render('../views/gluco-chart', {
        data: result
    });
})

app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000')
})
