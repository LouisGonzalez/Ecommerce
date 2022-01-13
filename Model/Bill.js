const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes){
    return sequelize.define('Bill', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        subtotal: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        shipping: {                             //envio
            type: DataTypes.FLOAT,
            allowNull: false
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        date: {
            type: DataTypes.CHAR(20),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Bill',
        tableName: 'Bill',
        timestamps: false
    })
}