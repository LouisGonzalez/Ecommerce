var { Product } = require('../Db');
const { Sequelize, Op } = require('sequelize');

//lista todos los productos
const showAll = async(req, res) => {
    try {
        const product = await Product.findAll();
        return res.status(200).json({ product });
    } catch(error){
        return res.status(500).send(error.message);
    }
}

//busca un producto en especifico
const findOne = async(req, res) => {
    try {
        const product = await Product.findOne(
            {
                where: { id: req.params.id }
            }
        )
        if(product === null){
            return res.status(500).json({ error: "It has not been found" });
        } else {
            return res.status(200).json({ product });
        }
    } catch(error){
        return res.status(500).send(error.message);
    }
}

//Crea un producto dentro de la tienda
const create = async(req, res) => {
    try {
        const product = await Product.create({
            price: req.body.price,
            salePrice: req.body.salePrice,
            title: req.body.title,
            brand: req.body.brand,
            description: req.body.description,            //Temporal
            user: req.body.user,                    //Temporal
            thumbImage: req.body.thumbImage
        });
        return res.status(200).json({ product });
    } catch(error){
        return res.status(500).send(error.message);
    }
}

//Edita un producto previamente creado
const update = async(req, res) => {
    try{
        const product = await Product.update(req.body, {
            where: { id: req.params.id }
        })
        return res.status(200).json({ success: "Has been modified" });
    } catch(error){
        return res.status(500).send(error.message);
    }
}

//Elimina un producto de la tienda
const del = async(req, res) => {
    try {
        await Product.destroy({
            where: { id: req.params.id }
        }).then(x => {
            if(x === 1){
                return res.status(200).json({ success: "Product deleted succesfully" });
            } else {
                return res.status(500).json({ error: "A error has been ocurred" });
            }
        })
    } catch(error){
        return res.status(500).send(error.message);
    }
}

//busca los productos de un usuario en especifico
const findByUser = async(req, res) => {
    try{
        const product = await Product.findAll({
            where: { user: req.params.user }
        })
        if(product === null){
            return res.status(500).json({ error: "It has not been found" });
        } else {
            return res.status(200).json({ product });
        }
    } catch(error){
        return res.status(500).send(error.message);
    }
}

module.exports = {
    showAll,
    findOne,
    create,
    update, 
    del,
    findByUser
}