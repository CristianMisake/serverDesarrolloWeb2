const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('./app/config/cors.json')
//middleware
const rutasProtegidas = express.Router();

// This will be our application entry. We'll setup our server here.
const http = require('http');
// Set up the express app
const app = express();
// Log requests to the console.
app.use(logger('dev'));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    const allowedOrigins = [config.cliente];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    // authorized headers for preflight requests
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Origin, X-API-KEY, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Allow', 'GET, POST');
    next();
});


// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/', (_, res) => res.status(200).send({
    mensaje: 'Bienvenido a express',
}));

//llamar los routers
require('./app/routers')(app, rutasProtegidas);

const port = parseInt(process.env.PORT, 10) || 3020;

app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`listening on port ${port}!`);
});

module.exports = app;