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
                xAxes: [{
                    type: 'time',
                    time: {
                        displayFormats: {
                            day: 'MMM D'
                        }
                    }
                }]
            },
            maintainAspectRatio: false,
            responsive: false
        }
    })
}

ctx.style.width = '100%';
ctx.style.height = '600px';

$('.last-n-btn').on('click', function () {
    const nDays = Number($(this).data('last'));
    const today = new Date();
    const lastDayData = dataDates.slice(dataDates.length - 1);
    const lastNdays = dataDates.slice(dataDates.length - nDays);
    const lastNvalues = dataValues.slice(dataValues.length - nDays);
    today.setDate(1);
    today.setMonth(today.getMonth() - 1);

    removeData(chart);
    addData(chart, lastNdays, lastNvalues);
    chart.update();

});

function addData(chart, label, data) {
    chart.data.labels = label;
    chart.data.datasets[0].data = data;
}

function removeData(chart) {
    chart.data.labels = [];
    chart.data.datasets[0].data = [];
}