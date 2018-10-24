const express = require('express');
const app = express();
const hbs = require('hbs');
const importFile = require('./public/assets/js/file-import');
const csvToArray = require('./utils/tools').csv_to_array;
const Chart = require('chart.js');

app.use(express.static(__dirname + '/public'))

// HBS engine for Express
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

hbs.registerHelper('glucoChart', (data) => {
    let chartDays = data.map(val => val.day +' '+ val.time);
    let chartValues = data.map(val => val.value);
    let out = '<canvas id="gluco-chart" width="400" height="400"></canvas>';
    /*const glucoChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartDays,
            datasets: [{
                label: 'glucosa',
                data: chartValues,
                fill: false,
                borderColor: [
                    'rgba(255,99,132,1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        //beginAtZero: true
                    }
                }]
            }
        }
    })*/
    console.log(chartDays, chartValues)
    return out;
});


let result = '';

function glucoObject(day, time, value) {
    this.day = day,
        this.time = time,
        this.value = value
}

importFile.parseFile('./public/assets/oscarcastel_18-09-2018.csv', (err, data) => {
    if (err) {
        throw new Error('Error: ' + err)
    }
    result = csvToArray(data.trim());
    let days = result.map((val, idx, arr) => {
        let dateSplit = val[2].split(' ');
        return new glucoObject(dateSplit[0], dateSplit[1], val[14]);
    });
    return result = days;
})

app.get('/f', function (req, res) {
    let data1 = result.map((val, idx) => {
        return idx >= 2 ? val.day + ' ' + val.time : null;
    });

    res.render('../views/gluco-chart', {
        data: result
    });
    //res.send(result);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
