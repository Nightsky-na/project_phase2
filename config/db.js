const mysql = require('mysql2');
const Sequelize = require('sequelize');
const User = require('../models/User');
const Login = require('../models/Login');
const Product = require('../models/Product');

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User(sequelize, Sequelize);
db.login = Login(sequelize, Sequelize);
db.product = Product(sequelize, Sequelize);

db.user.hasOne(db.login, { foreignKey: 'ID' });
db.login.belongsTo(db.user, { foreignKey: 'ID' });


module.exports = db;
/* 
======== Reference ========
https://www.borntodev.com/2021/07/02/node-js-%E0%B8%81%E0%B8%B1%E0%B8%9A-sequelize-101/
https://www.bezkoder.com/node-js-express-sequelize-mysql/
https://www.bezkoder.com/node-js-upload-image-mysql/
*/