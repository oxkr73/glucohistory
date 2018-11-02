/*const fs = require('fs');
const file = '../oscarcastel_18-09-2018.csv';

const parseFile = '';

fs.readFile(file, (err, data) => {
    if(err) return console.log(err);
    return parseFile = data;
        });

console.log(parseFile);
*/

$('#btn-clickme').on('click', function () { });

const Chart = require('chart.js');
const ctx = document.getElementById("gluco-chart");
const dataDates = ctx.getAttribute("data-dates").split(',');
const dataValues = ctx.getAttribute("data-values").split(',');
let chart;
if (ctx) {
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataDates,
            datasets: [{
                label: 'gluco values',
                data: dataValues,
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
            },
            maintainAspectRatio: false,
            responsive: false
        }
    })
}

$('#last-month-btn').on('click', function () {
    const today = new Date();
    const lastDayData = dataDates.slice(dataDates.length - 1);
    const last30days = dataDates.slice(dataDates.length - 30);
    const last30values = dataValues.slice(dataValues.length - 30);
    today.setDate(1);
    today.setMonth(today.getMonth() - 1);
    console.log(lastDayData.slice(lastDayData.length - 30));

    addData(chart, last30days, last30values)
});

function addData(chart, label, data) {
    console.log(chart, label, data)
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}