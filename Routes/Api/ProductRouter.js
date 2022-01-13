'use strict'
const router = require('express').Router();
var ProductController = require('../../Controller/ProductController');

//listado de rutas para los metodos

router.get('/', ProductController.showAll);
router.get('/:id', ProductController.findOne);
router.post('/', ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.del);
router.get('/user/:user', ProductController.findByUser);
//exportan metodos del router
module.exports = router;