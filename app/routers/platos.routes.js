// Controlles
const platoController = require('../controllers/platos');
module.exports = (app, protect) => {
   app.post('/api/plato/create', protect, platoController.create);
   app.post('/api/plato/update', protect, platoController.update);
   app.post('/api/plato/list', protect, platoController.list);
   app.post('/api/plato/find', protect, platoController.find);
   app.post('/api/plato/listBy/categoria', protect, platoController.listByCategoria);
   app.post('/api/plato/delete', protect, platoController.delete);
};