const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes){
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.CHAR(50),
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.CHAR(100),
            allowNull: false
        },
        lastname: {
            type: DataTypes.CHAR(100),
            allowNull: false
        },
        password: {
            type: DataTypes.CHAR(100),
            allowNull: false
        },
        email: {
            type: DataTypes.CHAR(150),
            allowNull: false
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        extension: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize, 
        modelName: 'User',
        tableName: 'User',
        timestamps: false
    })
}