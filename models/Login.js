const { DataTypes } = require('sequelize');

// define login_info model
module.exports = (sequelize, Sequelize) => {
    const Login = sequelize.define('login_info', {
        email: {
            type: DataTypes.STRING(200),
            allowNull: false,
            primaryKey: true
        },
        ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        tableName: 'login_info',
        timestamps: false,
        indexes: [
            {
                unique: false,
                fields: ['ID']
            },
            {
                unique: false,
                fields: ['email']
            }
        ]
    });
    return Login;
};