//models
const plato = require('../models').platos;
const categoria = require('../models').categorias;
//utils
const { validar } = require('../utils/valid');

module.exports = {
    create(req, res) {
        //datos
        const datos = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            valor: req.body.valor,
            idCategoria: req.body.idCategoria
        }
        //validar campos vacios
        if (validar(datos)) return res.status(400).send({ mensaje: 'Algunos campos estan vacios' })
        return plato.create(datos)
            .then(_ => res.status(200).send({ datos: { create: true } }))
            .catch(error => res.status(400).send(error))
    },
    update(req, res) {
        //where
        const where = { id: req.body.id }
        //validar id vacio
        if (validar(where)) return res.status(400).send({ mensaje: 'Algunos campos estan vacios' })
        //data
        let data = {}
        //comprobar cada campo
        if (req.body.nombre) data.nombre = req.body.nombre
        if (req.body.descripcion) data.descripcion = req.body.descripcion
        if (req.body.valor) data.valor = req.body.valor
        if (req.body.idCategoria) data.idCategoria = req.body.idCategoria
        if (data === {}) return res.status(400).send({ mensaje: 'No hay información para actualizar' });
        //actualizar
        return plato.update(data, { where: where })
            .then(_ => res.status(200).send({ datos: { update: true } }))
            .catch(error => res.status(400).send(error))
    },
    list(_, res) {
        return plato.findAll({where: { estado: 1 }})
            .then(plato => res.status(200).send({ datos: plato }))
            .catch(error => res.status(400).send(error))
    },
    listByCategoria(req, res) {
        //where
        const where = {
            idCategoria: req.body.idCategoria,
            estado: 1
        }
        //validar id vacio
        if (validar(where)) return res.status(400).send({ mensaje: 'Algunos campos estan vacios' })
        return plato.findAll({ where: where })
            .then(plato => res.status(200).send({ datos: plato }))
            .catch(error => res.status(400).send(error))
    },
    delete(req, res) {
        //where
        const where = { id: req.body.id }
        //validar id vacio
        if (validar(where)) return res.status(400).send({ mensaje: 'Algunos campos estan vacios' })
        return plato.destroy({ where: where })
            .then(_ => res.status(200).send({ datos: { delete: true } }))
            .catch(error => res.status(400).send(error))
    },
};