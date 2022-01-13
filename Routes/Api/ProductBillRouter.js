'use strict'

const router = require('express').Router();
var ProductBillController = require('../../Controller/ProductBillController');

//listado de rutas
router.post('/', ProductBillController.create)


//exportar metodos del router
module.exports = router;