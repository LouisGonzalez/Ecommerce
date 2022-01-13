'use strict'
const router = require('express').Router();

var apiProducts = require('./Api/ProductRouter');
//si una ruta viene con /product el encargado de la ruta será apiProduct, y se concatena a router
router.use('/product',apiProducts);

var apiUser = require('./Api/UserRouter');
//si una ruta viene con /user el encargado de la ruta será apiUser, y se concatena a router
router.use('/user',apiUser);

var apiBill = require('./Api/BillRouter');
//si una ruta viene con /bill el encargado de la ruta sera apiBill, y se concatena a router 
router.use('/bill',apiBill);

var apiProductBill = require('./Api/ProductBillRouter');
//si una ruta viene con /product-bill el encargado de la ruta sera apiProductBill y se concatena a router
router.use('/product-bill', apiProductBill);

module.exports = router;