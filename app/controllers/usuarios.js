const md5 = require('md5');

const usuario = require('../models').usuarios;
//controladores necesarios
const { loginIn } = require('./session');

module.exports = {
    create(req, res) {
        return usuario
            .create ({
                name: req.body.name,
                user: req.body.user,
                password: md5(req.body.password),
                perfil: req.body.perfil,
            })
            .then(usuario => res.status(200).send(usuario))
            .catch(error => res.status(400).send(error))
    },
    list(_, res) {
        return usuario.findAll({})
            .then(usuario => res.status(200).send(usuario))
            .catch(error => res.status(400).send(error))
    },
    find (req, res) {
        return usuario.findAll({
            where: {
                id: req.decoded.id,
            }
        })
        .then(usuario => res.status(200).send(usuario))
        .catch(error => res.status(400).send(error))
    },
    login (req, res) {
        return usuario.findAll({
            where: {
                user: req.body.user,
                password: md5(req.body.password),
            }
        })
        .then(usuario => loginIn(usuario, res))
        .catch(error => res.status(400).send(error))
    },
};