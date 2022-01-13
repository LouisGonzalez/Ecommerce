const { Sequelize } = require('sequelize');
const { database } = require('./config');
const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password, {
        host: database.host,
        dialect: "mysql",
        dialectOptions: {
            ssl: {
                required: true,
                rejectUnauthorized: false
            }
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
);

const userModel = require('./Model/User');
const User = userModel(sequelize, Sequelize);

const productModel = require('./Model/Product');
const Product = productModel(sequelize, Sequelize);

const billModel = require('./Model/Bill');
const Bill = billModel(sequelize, Sequelize);

const productBillModel = require('./Model/ProductBill');
const ProductBill = productBillModel(sequelize, Sequelize);

Product.belongsTo(User, { foreignKey: "user" })
User.hasMany(Product, { foreignKey: "user" });

Bill.belongsTo(User, { foreignKey: "user" });
User.hasMany(Bill, { foreignKey: "user"});

ProductBill.belongsTo(Bill, { foreignKey: "idBill" });
Bill.hasMany(ProductBill, { foreignKey: "idBill" });

ProductBill.belongsTo(Product, { foreignKey: "idProduct" });
Product.hasMany(ProductBill, { foreignKey: "idProduct" });

sequelize.sync({ force: false }).then(() => {
    console.log('Tablas sincronizadas');
}).catch(err => console.log(err));

module.exports = {
    sequelize, 
    User,
    Product,
    Bill,
    ProductBill
}