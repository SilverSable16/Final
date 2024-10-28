// routers/facturaRoutes.js
const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/controller.factura.js');

router.post('/realizar-compra', facturaController.realizarCompra);

module.exports = router;