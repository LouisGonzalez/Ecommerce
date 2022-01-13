'use strict'

const router = require('express').Router();
var BillController = require('../../Controller/BillController');

//listado de rutas
router.post('/', BillController.create)


//exportar metodos del router
module.exports = router;