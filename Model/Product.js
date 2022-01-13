const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes){
    return sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        salePrice: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        title: {
            type: DataTypes.CHAR(100),
            allowNull: false
        },
        brand: {
            type: DataTypes.CHAR(75),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        thumbImage: {
            type: DataTypes.CHAR(150),
        }
    }, {
        sequelize, 
        modelName: 'Product',
        tableName: 'Product',
        timestamps: false
    })
}