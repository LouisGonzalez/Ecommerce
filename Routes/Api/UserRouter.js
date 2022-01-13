'use strict'

const router = require('express').Router();
var UserController = require('../../Controller/UserController');

//listado de rutas

router.get('/', UserController.showAll);
router.get('/:id', UserController.findOne);
router.post('/', UserController.create);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.del);
router.post('/login', UserController.login);

//exportar metodos del router
module.exports = router;