// Controlles
const pedidoController = require('../controllers/pedidos');
module.exports = (app, protect) => {
   app.post('/api/pedido/create', protect, pedidoController.create);
   app.post('/api/pedido/pagar', protect, pedidoController.pagar);
};