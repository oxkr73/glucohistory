const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const Usuario = require('../models/usuario')
const app = express();
const csv = require('fast-csv')

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
console.log(req)
    csv
        .fromString(usuarioFile.data.toString(), {
            headers: false,
            ignoreEmpty: true
        })
        .on("data-invalid", function(data){
            console.log('data-invalid')
        })
        .on('data', function (data) {
            //data['_id'] = new mongoose.Types.ObjectId();
            glucoData.push(data);
        })
        .on('end', function () {
            console.log('end')
            Usuario.findOneAndUpdate(id, {glucoData:glucoData}, {new: true}, (err, usuarioBD) => {
                if (err){
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                //usuarioBD.glucoData = body.data;
                console.log(id, usuarioBD.data);
            })
            //res.send(userData.length + ' data have been uploaded')
            res.render('upload-form', {
                result: glucoData.length + ' data have been uploaded \n' + JSON.stringify(glucoData)
            })
        })
});

module.exports = app;