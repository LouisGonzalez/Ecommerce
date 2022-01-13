var { Bill } = require('../Db');
const { Sequelize, Op } = require('sequelize');

//Crea una nueva factura por compra realizada
const create = async(req, res) => {
    try{
        const bill = await Bill.create({
            user: req.body.user,
            subtotal: req.body.subtotal,
            shipping: req.body.shipping,
            total: req.body.total,
            date: req.body.date
        });
        return res.status(200).json({ bill });
    } catch(error){
        return res.status(500).send(error.message);
    }
}

module.exports = {
    create
}