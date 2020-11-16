// Controlles
const categoriaController = require('../controllers/categorias');
module.exports = (app, protect) => {
   app.post('/api/categoria/create', protect, categoriaController.create);
   app.post('/api/categoria/update', protect, categoriaController.update);
   app.post('/api/categoria/list', protect, categoriaController.list);
   app.post('/api/categoria/delete', protect, categoriaController.delete);
};