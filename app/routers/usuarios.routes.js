// Controlles
const usuarioController = require('../controllers/usuarios');
module.exports = (app, protect) => {
   app.get('/api', protect, (req, res) => res.status(200).send ({
      mensaje: 'Servicios de rutas protegidas',
   }));
   app.post('/api/usuario/create', protect, usuarioController.create);
   app.post('/api/usuario/update', protect, usuarioController.update);
   app.post('/api/usuario/list', protect, usuarioController.list);
   app.post('/api/usuario/delete', protect, usuarioController.delete);
   //login
   app.post('/api/usuario/login', usuarioController.login);
   app.post('/api/usuario/verifyLogin', protect, usuarioController.verifyLogin);
};