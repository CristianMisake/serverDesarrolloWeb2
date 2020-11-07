
// Controlles
const usuarioController = require('../controllers/usuarios');
module.exports = (app, protect) => {
   app.get('/api', (req, res) => res.status(200).send ({
      mensaje: 'Example project did not give you access to the api web services',
   }));
   app.post('/api/usuario/create', usuarioController.create);
   app.get('/api/usuario/list', usuarioController.list);
   app.post('/api/usuario/find', protect, usuarioController.find);
   app.post('/api/usuario/login', usuarioController.login);
};