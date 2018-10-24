const csv = require('fast-csv')
const mongoose = require('mongoose')
const Usuario = require('../models/usuario')

exports.post = function (req, res) {
    console.log(req);

    if (!req.files) {
        return res.status(400).send('No files were uploaded')
    }

    const usuarioFile = req.files.file;
    let userData = [];


    csv
        .fromString(usuarioFile.data.toString(), {
            headers: true,
            ignoreEmpty: true
        })
        .on('data', function (data) {
            console.log(data);
            //data['_id'] = new mongoose.Types.ObjectId();
            userData.push(data);
        })
        .on('end', function () {
            /*Usuario.create(userData, function (err, documents) {
                if (err) throw new err;
            })*/
            res.send(userData.length + ' data have been uploaded')
        })
}