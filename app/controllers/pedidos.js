const pedido = require('../models').pedidos;
const pedido_plato = require('../models').pedido_plato;

module.exports = {
    create(req, res) {
        const pedidosIn = req.body.pedidos
        //creando pedido
        const pedidoIn = pedido.create({ valorTotal: 0, idUsuario: req.decode.id })
        //valor inicial
        let valorTotal = 0
        //verificar todos los pedidos
        pedidosIn.forEach(pedidoIn => {
            //buscar plato
            const platoIn = plato.findAll({ where: { id: pedidoIn.idPlato, estado: 1 }})
            //verificar busqueda
            platoIn.catch(error => { return res.status(400).send(error) })
            //guardar ingrediente
            const pedido_platoIn = pedido_plato.create({ idPedido: pedidoIn.id, idPlato: pedidoIn.idPlato })
            valorTotal += platoIn.valor
            //verificar creación
            pedido_platoIn.catch(error => { return res.status(400).send(error) })
        });
        //actualizar valor total
        pedidoIn.valorTotal = valorTotal
        //guardar cambios
        return pedidoIn
            .save()
            .then(pedido => res.status(200).send(pedido))
            .catch(error => res.status(400).send(error))
    },
    pagar(req, res) {
        const pedidoIn = plato.findAll({ where: { id: req.body.id, estado: 2 }})
        //actualizar valor total
        pedidoIn.estado = 1
        //guardar cambios
        return pedidoIn
            .save()
            .then(pedido => res.status(200).send(pedido))
            .catch(error => res.status(400).send(error))
    },
};