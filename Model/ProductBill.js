const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes){
    return sequelize.define('ProductBill', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        idBill: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idProduct: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'ProductBill',
        tableName: 'ProductBill',
        timestamps: false
    })
}