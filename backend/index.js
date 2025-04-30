//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// index.js (o server.js, app.js… donde arranques la app)
require('dotenv').config();            // ← Debe ir *antes* de cualquier otro require

const express = require('express');    // ← Ahora sí requieres Express
const { conn } = require('./src/db');  // ← Y tu conexión a la base
const preloadData = require('./src/routes/seed');
const { createPaymentIntent, handlePaymentWebhook } = require('../backend/src/controllers/paymentController');
const server = require('./src/app');

// Opcional: log para verificar que la variable está disponible
console.log("🔑 STRIPE_SECRET_KEY →", process.env.STRIPE_SECRET_KEY?.slice(0, 6) + '…');

conn.sync({ force: true }).then(async () => {
  await preloadData();
  server.listen(3001, () => {
    console.log("Servidor escuchando en el puerto 3001");
  });
});
