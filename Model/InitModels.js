var DataTypes = require('sequelize').DataTypes;
var _User = require('./User');
var _Product = require('./Product');

function initModels(sequelize){
    var User = _User(sequelize, DataTypes);
    var Product = _Product(sequelize, DataTypes);

    Product.belongsTo(User, { foreignKey: "user" })
    User.hasMany(Product, { foreignKey: "user" });

    return {
        User,
        Product,
    };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;