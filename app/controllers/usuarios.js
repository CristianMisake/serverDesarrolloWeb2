//hash
const md5 = require('md5');
//utils
const { validar } = require('../utils/valid');
//models
const usuario = require('../models').usuarios;
//controladores necesarios
const { loginIn } = require('./session');

module.exports = {
    create(req, res) {
        //datos
        const datos = {
            name: req.body.name,
            user: req.body.user,
            password: md5(req.body.password),
            perfil: 2,
        }
        //validar campos vacios
        if (validar(datos)) res.status(400).send({ mensaje: 'Algunos campos estan vacios' })
        return usuario
            .create (datos)
            .then(usuario => res.status(200).send(usuario))
            .catch(error => res.status(400).send(error))
    },
    update(req, res) {
        //where
        const where = { id: req.body.id }
        //validar id vacio
        if (validar(where)) return res.status(400).send({ mensaje: 'Algunos campos estan vacios' })
        let data = {}
        //comprobar cada campo
        if (req.body.name) data.name = req.body.name
        if (req.body.password) data.password = md5(req.body.password)
        if (data === {}) return res.status(400).send({ mensaje: 'No hay información para actualizar' });
        //actualizar
        return usuario.update(data, { where: where })
            .then(_ => res.status(200).send({ actualizado: true }))
            .catch(error => res.status(400).send(error))
    },
    delete(req, res) {
        //where
        const where = { id: req.body.id }
        //validar id vacio
        if (validar(where)) return res.status(400).send({ mensaje: 'Algunos campos estan vacios' })
        return usuario.destroy({ where: where })
            .then(_ => res.status(200).send({ eliminado: true }))
            .catch(error => res.status(400).send(error))
    },
    list(_, res) {
        return usuario.findAll({})
            .then(usuario => res.status(200).send(usuario))
            .catch(error => res.status(400).send(error))
    },
    find(req, res) {
        return usuario.findAll({ where: { id: req.decoded.id } })
            .then(usuario => res.status(200).send(usuario))
            .catch(error => res.status(400).send(error))
    },
    login(req, res) {
        //where
        const where = {
            user: req.body.user,
            password: md5(req.body.password),
        }
        //validar campos vacios
        if (validar(where)) return res.status(400).send({ mensaje: 'Algunos campos estan vacios' })
        return usuario.findAll({ where: where })
            .then(usuario => loginIn(usuario, res))
            .catch(error => res.status(400).send(error))
    },
    verifyLogin(_, res) { res.send({ loggend: true }) },
};