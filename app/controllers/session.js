const jwt = require('jsonwebtoken');
const config = require('../config/token.json');

const validToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, config.keyToken, (err, decoded) => {      
            if (err) return res.status(401).send({ mensaje: 'Token inválida', error: true });    
            else {
                req.decoded = decoded;    
                next();
            }
        });
    } else res.status(401).send({ mensaje: 'Token no proveída.', error: true });
}

const loginIn = (datos, res) => {
    if (datos.length === 0) return res.status(400).send({ mensaje: 'Usuario no existe' });
    const token = jwt.sign({ id: datos[0]['id'] }, config.keyToken);
    return res.status(200).send([{ token: token }]);
};

module.exports =  {
    validToken,
    loginIn,
};