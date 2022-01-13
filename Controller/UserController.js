var { User } = require('../Db');
const { Sequelize, Op } = require('sequelize');
const jwt = require('jwt-simple');

//lista todos los usuarios
const showAll = async(req, res) => {
    try {
        const user = await User.findAll();
        return res.status(200).json({ user }).data;
    } catch (error){
        return res.status(500).send(error.message);
    }
}

//busca un usuario en especifico
const findOne = async(req, res) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id }
        })
        if(user === null){
            return res.status(500).json({ error: "It has not been found" });
        } else {
            return res.status(200).json({ user });
        }
    } catch(error){
        return res.status(500).send(error.message);
    }
}

//Crea un usuario dentro de la tienda
const create = async(req, res) => {
    try {
        const user = await User.create({
            username: req.body.username,
            name: req.body.name,
            lastname: req.body.lastname,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone,
            extension: req.body.extension
        });
        return res.status(200).json({ user });
    } catch(error){
        return res.status(500).send(error.message);
    }
}

//Edita un usuario previamente creado
const update = async(req, res) => {
    try {
        const user = await User.update(req.body, {
            where: { id: req.params.id }
        })
        return res.status(200).json({ success: "Has been modified" })
    } catch(error){
        return res.status(500).send(error.message);
    }
}

//Elimina un usuario 
const del = async(req, res) => {
    try {
        await User.destroy({
            where: { id: req.params.id }
        }).then(x => {
            if(x == 1){
                return res.status(200).json({ success: "Product deleted succesfully" });
            } else {
                return res.status(500).json({ error: "A error has been ocurred" });
            }
        })
    } catch(error){
        return res.status(500).send(error.message);
    }
}


const login = async(req, res) => {
    try {
        if(req.body.username === "" && req.body.password === ""){
            return res.status(500).json({ error: "You must be enter your username and PIN" });
        } else {
            const user = await User.findOne({ where: {
                [Op.and]: [{ username: req.body.username },
                           { password: req.body.password }]
            } });
            if(user){
                createToken(user, res);
            } else {
                return res.status(500).json({ error: "Incorrect credentials" });
            }
        }
    } catch(error){
        return res.status(500).send(error.message);
    }
}

const createToken = async (user, res) => {
    const payload = {
        id: user.id,
        username: user.username,
        name: user.name,
        lastname: user.lastname
    }
    const user2 = {
        id: user.id,
        username: user.username,
        name: user.name,
        lastname: user.lastname
    }
    let token = jwt.encode(payload, 'tarjeta')
    return res.status(200).json({ success: token, user: user2 })
}

module.exports = {
    showAll,
    findOne,
    create,
    update,
    del, 
    login
}