const express = require('express');
const Usuario = require('../models/usuario');
const app = express();

app.get('/usuario', function (req, res) {
    let from = req.query.from || 0;
        from = Number(from);

    let range = req.query.limit || 5;
        range = Number(range);
    Usuario.find({})
            .skip(from)
            .limit(range)
            .exec((err,usuarios) => {
                if (err){
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.render('home',{
                    ok: true,
                    data: usuarios
                });
            })
});

app.post('/usuario', function (req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        role: body.role,
        glucoData: body.glucoData
    });

    usuario.save( (err,usuerioDB) => {
        if (err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuerioDB
        });
    });
});

app.get('/usuario/:id', function (req, res) {
    let id = req.params.id;

    Usuario.find({'email':'oscar3@oxkr.es'})
            .exec((err,usuario) => {
                if (err){
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.render('home',{
                    ok: true,
                    data: usuario
                });
            })
});

app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    let body = req.body;
    res.render('home',{
        data: JSON.stringify(body)
    })
});

app.delete('/usuario/:id', function (req, res) {
    let id = req.params.id;
    res.json('Delete Usuario '+ id);
});


module.exports = app;