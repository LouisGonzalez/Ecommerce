var { ProductBill } = require('../Db');
const { Sequelize, Op } = require('sequelize');

//Crea un producto dentro de una factura
const create = async(req, res) => {
    try{
        const productBill = await ProductBill.create({
            idBill: req.body.idBill,
            idProduct: req.body.idProduct,
            amount: req.body.amount,
            total: req.body.total
        });
        return res.status(200).json({ productBill });
    } catch(error){
        return res.status(500).send(error.message);
    }
}

module.exports = {
    create
}