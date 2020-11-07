const { validToken } = require('../controllers/session');

module.exports = (app, protect) => {
    //rutas protegidas con token
    protect.use(validToken);
    //routes
    require('./usuarios.routes')(app, protect);
};