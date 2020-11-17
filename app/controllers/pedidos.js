const pedido = require('../models').pedidos;
const pedido_plato = require('../models').pedido_plato;

const crearPedido = async (res, data, callback) => {
    await pedido.create(data)
    .then(pedido => callback(pedido))
    .catch(error => res.status(400).send(error));
}

const crearPedidoPlato = async (res, data, callback) => {
    await pedido_plato.bulkCreate(data)
    .then(pedido => callback(pedido))
    .catch(error => res.status(400).send(error));
}


module.exports = {
    create(req, res) {
        const platos = req.body.platos;
        //creando pedido
        crearPedido(res, { idUsuario: req.decoded.id }, (pedido) => {
            //valor inicial
            let dataPedidosPlato = []
            platos.forEach(plato => {
                dataPedidosPlato.push({ idPedido: pedido.id, idPlato: plato });
            });
            crearPedidoPlato(res, dataPedidosPlato, (resp) => {
                console.log("------------------------")
                console.log(resp)
                console.log(platos)
                console.log("------------------------")
                return res.status(200).send({ mensaje: 'Pedido pagado' });
            });
        })
    },
};