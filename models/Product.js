const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        idproduct_info: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.BLOB,
            allowNull: true
        }, 
        name_image: {
            type: DataTypes.STRING,
            allowNull: true
        }

    });

    return Product;
};
