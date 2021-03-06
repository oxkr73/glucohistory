const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const Usuario = require('../models/usuario');
const app = express();
const csv = require('fast-csv');

app.use(fileUpload());

app.get('/upload-form', function (req, res) {
    res.render('upload-form', {
        owner: 'by OXKR',
        result: JSON.stringify(req.body)
    })
});

app.post('/upload-form', function (req, res) {
    let id = '5bc99710dce7e920f8e54c67';
    let body = req.body;

    if (!req.files) {
        return res.status(400).send('No files were uploaded')
    }

    const usuarioFile = req.files.file;
    let glucoData = [];

    csv
        .fromString(usuarioFile.data.toString(), {
            headers: false,
            ignoreEmpty: true
        })
        .on("data-invalid", function (data) {
            console.log('data-invalid')
        })
        .on('data', function (data) {
            //data['_id'] = new mongoose.Types.ObjectId();
            //glucoData.push(data[2] + ' ' + data[14]);
            glucoData.push(new glucoObject(toIsoDate(data[2]), Number(data[14])));
        })
        .on('end', function () {
            console.log('end')
            glucoDataClean = glucoData.splice(2);
            Usuario.findOneAndUpdate(id, { glucoData: glucoDataClean }, { new: true }, (err, usuarioBD) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                //usuarioBD.glucoData = body.data;
            })
            res.render('upload-form', {
                result: glucoData.length + ' data have been uploaded <br>' + JSON.stringify(glucoData)
            })
        })
});

function glucoObject(time, value) {
    //this.day = day,
    this.time = time,
        this.value = value
}

function toIsoDate(string) {
    const dateSplit = string.split(' ');
    const dateFormated = dateSplit[0].split('-').reverse().join('/');
    return new Date(dateFormated + ' ' + dateSplit[1]);
}

module.exports = app;