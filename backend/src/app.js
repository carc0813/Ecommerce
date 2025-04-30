const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require("cors");
const path = require('path');
require('./db.js');

const server = express();

server.name = 'API';

// ⚡️ Stripe Webhook necesita RAW antes del body-parser
server.use('/payments/webhook', express.raw({ type: 'application/json' }));

// ⚡️ Luego el parser normal para el resto
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

server.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

// ⚡️ Tus rutas
server.use('/', routes);

// ⚡️ Servir imágenes estáticas
server.use('/images', express.static(path.join(__dirname, 'images')));

// ⚡️ Manejo de errores
server.use((err, req, res, next) => { 
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
