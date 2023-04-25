const fs = require('fs');
const db = require('../config/db');
const {Op} = require('sequelize');

const Product = db.product;

// @desc  Create a new product
exports.createProduct = async (req, res) => {
    try{
        
        const image = req.file;
        const { name, description, price, type, idproduct_info } = req.body;
        
        const image_name = req.file.filename;
        
        const newProduct = await Product.create({
            idproduct_info,
            name,
            price,
            description,
            type,
            image: fs.readFileSync(
                __basedir + '/static/assets/uploads/' + req.file.filename
            ),
            name_image: image_name,
        }).then((product) => {
            fs.writeFileSync(
                __basedir + '/static/assets/tmp/' + product.name_image,
                product.image
            );

            return res.status(201).json({
                success: true,
                message: 'Image uploaded successfully',
                data: image,
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// @desc  Delete a product by id
exports.deleteProduct = async (req, res) => {
    try {
        const { idproduct_info } = req.body;
        const product = await Product.findOne({
            where: {
                idproduct_info: idproduct_info
            }
        });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        await Product.destroy({
            where: {
                idproduct_info: idproduct_info
            }
        });
        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};


// @desc  Update a product by id
exports.updateProduct = async (req, res) => {
    try {
        const { idproduct_info } = req.body;
        const product = await Product.findOne({
            where: {
                idproduct_info: idproduct_info
            }
        });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        const image = req.file;
        const { name, description, price, type } = req.body;
        const image_name = req.file.filename;

        await Product.update({
            name,
            price,
            description,
            type,
            image: fs.readFileSync(
                __basedir + '/static/assets/uploads/' + req.file.filename
            ),
            name_image: image_name,
        }, {
            where: {
                idproduct_info: idproduct_info
            }
        }).then((product) => {
            fs.writeFileSync(
                __basedir + '/static/assets/tmp/' + product.name_image,
                product.image
            );
        
            return res.status(201).json({
                success: true,
                message: 'Image uploaded successfully',
                data: image,
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};


// @desc  Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
}

// @desc  Get all products by name similar to the input
exports.getProductByName = async (req, res) => {
    try {
        const { name } = req.body;
        const products = await Product.findAll({
            where: {
                name: {
                    [Op.like]: '%' + name + '%'
                }
            }
        });
        res.status(200).json({
            success: true,
            data: products,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// @desc  Get all products by type
exports.getProductByType = async (req, res) => {
    try {
        const { type } = req.body;
        const products = await Product.findAll({
            where: {
                type: type
            }
        });
        res.status(200).json({
            success: true,
            data: products,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
}

// @desc Get all products by type and name 
exports.getProductByTypeAndName = async (req, res) => {
    try {
        const { type, name } = req.body;
        const products = await Product.findAll({
            where: {
                type: type,
                name: {
                    [Op.like]: '%' + name + '%'
                }
            }
        });
        res.status(200).json({
            success: true,
            data: products,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
}

// @desc Get all products by id
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.body;
        const products = await Product.findAll({
            where: {
                idproduct_info: id
            }
        });
        res.status(200).json({
            success: true,
            data: products,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
}

// @desc Get all products by description
exports.getProductByDescription = async (req, res) => {
    try {
        const { description } = req.body;
        const products = await Product.findAll({
            where: {
                description: {
                    [Op.like]: '%' + description + '%'
                }
            }
        });
        res.status(200).json({
            success: true,
            data: products,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};
    