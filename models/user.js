var db = require('../db.js');
var Sequelize = require('Sequelize');
const user = db.define('user',{
    id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING
    },
    firstname: {
        type: Sequelize.STRING
    },
    lastname: {
        type: Sequelize.STRING
    }
}, {
    tableName : 'user',
    createdAt : 'createdAt',
    updatedAt : 'updatedAt',
    deletedAt : false,
    freezeTableName: true
});

user.sync({force: false});
module.exports = user;