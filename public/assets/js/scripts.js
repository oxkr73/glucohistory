/*const fs = require('fs');
const file = '../oscarcastel_18-09-2018.csv';

const parseFile = '';

fs.readFile(file, (err, data) => {
    if(err) return console.log(err);
    return parseFile = data;
        });

console.log(parseFile);
*/

$('#btn-clickme').on('click', function() {

});

const Chart = require('chart.js');
const ctx = document.getElementById("gluco-chart");
const dataDates = ctx.getAttribute("data-dates").split(',');
const dataValues = ctx.getAttribute("data-values").split(',');
if (ctx) {
    const glucoChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataDates,
            datasets: [{
                label: 'gluco values',
                data: dataValues,
                fill: false,
                /*backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],*/
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
    })
}