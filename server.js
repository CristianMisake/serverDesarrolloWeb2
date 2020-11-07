const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
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

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/', (req, res) => res.status(200).send({
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