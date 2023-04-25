// const Sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

// define user_info model
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user_info', {
        fname: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        lname: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(200),
            allowNull: false,
            primaryKey: true
        },
        role: {
            type: DataTypes.STRING(45),
            allowNull: false,
            defaultValue: 'USER'
        }
    }, {
        tableName: 'user_info',
        timestamps: false
    });
    
    return User;
};