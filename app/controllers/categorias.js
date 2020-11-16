//models
const categoria = require('../models').categorias;
//utils
const { validar } = require('../utils/valid');

module.exports = {
    create(req, res) {
        //datos
        const datos = { nombre: req.body.nombre }
        //validar campos vacios
        if (validar(datos)) return res.status(400).send({ mensaje: 'Algunos campos estan vacios' })
        return categoria
            .create (datos)
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
        if (data === {}) return res.status(400).send({ mensaje: 'No hay información para actualizar' });
        //actualizar
        return categoria.update(data, { where: where })
            .then(_ => res.status(200).send({ datos: { update: true } }))
            .catch(error => res.status(400).send(error))
    },
    list(_, res) {
        return categoria.findAll({})
            .then(categoria => res.status(200).send({ datos: categoria }))
            .catch(error => res.status(400).send(error))
    },
    delete(req, res) {
        //where
        const where = { id: req.body.id }
        //validar id vacio
        if (validar(where)) return res.status(400).send({ mensaje: 'Algunos campos estan vacios' })
        return categoria.destroy({ where: where })
            .then(_ => res.status(200).send({ datos: { delete: true } }))
            .catch(error => res.status(400).send(error))
    },
};