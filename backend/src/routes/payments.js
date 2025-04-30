const express = require("express"); // 👈 agregar esta línea
const { Router } = require("express");
const { createPaymentIntent, handlePaymentWebhook } = require("../controllers/paymentController");

const router = Router();

// Endpoint para crear un Payment Intent
router.post("/create-intent", createPaymentIntent);

// Endpoint para recibir webhooks
router.post("/webhook", express.raw({ type: 'application/json' }), handlePaymentWebhook);

module.exports = router;