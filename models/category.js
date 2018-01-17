var db = require('../db.js');
var Sequelize = require('Sequelize');
const category = db.define('category',{
    id_cat: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    }
}, {
    tableName : 'category',
    createdAt : 'createdAt',
    updatedAt : 'updatedAt',
    deletedAt : false,
    freezeTableName: true
});

category.sync({force: false});
module.exports = category;