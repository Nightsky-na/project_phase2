const mysql = require('mysql2');
const Sequelize = require('sequelize');
const User = require('../models/User');
const Login = require('../models/Login');
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

db.user.hasOne(db.login, { foreignKey: 'ID' });
db.login.belongsTo(db.user, { foreignKey: 'ID' });

module.exports = db;



// // Connect to database
// const connectDB = async () => {
//     const conn = await mysql.createConnection({
//         host: process.env.MYSQL_HOST,
//         user: process.env.MYSQL_USERNAME,
//         password: process.env.MYSQL_PASSWORD,
//         database: process.env.MYSQL_DATABASE,
        
//     });
//     console.log(`MySQL Connected`);
//     return conn
// };

// module.exports = connectDB;

/* 
======== Reference ========
https://www.borntodev.com/2021/07/02/node-js-%E0%B8%81%E0%B8%B1%E0%B8%9A-sequelize-101/
https://www.bezkoder.com/node-js-express-sequelize-mysql/
*/