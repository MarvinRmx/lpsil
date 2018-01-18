var db = require('../db.js');
var Sequelize = require('Sequelize');
const category = require('./category.js');
const product = db.define('product',{
    id_prod: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.INTEGER
    },
    stock: {
        type: Sequelize.INTEGER
    }
}, {
    tableName : 'product',
    createdAt : 'createdAt',
    updatedAt : 'updatedAt',
    deletedAt : false,
    freezeTableName: true
});
product.belongsTo(category);
product.sync({force: false});
module.exports = product;