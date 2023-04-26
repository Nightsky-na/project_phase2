const express = require('express');
const router = express.Router();
const {createProduct , getAllProducts, getProductByName, getProductByType, getProductByTypeAndName, getProductById, getProductByDescription, getProductByTypeAndDescription, createProductNoImage, deleteProduct, editProduct} = require('../controllers/product');
const uploadFile = require('../middleware/upload');

// Create a product
router.route('/create-product').post(uploadFile.single('file'), createProduct);

// Delete a product
router.route('/delete-product').post(deleteProduct);

// Get all products
router.route('/get-all-products').post(getAllProducts);

// Get all products by name similar to the input
router.route('/get-product-by-name').post(getProductByName);

// Get all products by type
router.route('/get-product-by-type').post(getProductByType);

// Get all products by type and name
router.route('/get-product-by-type-and-name').post(getProductByTypeAndName);

// Get all products by type and description
router.route('/get-product-by-type-and-description').post(getProductByTypeAndDescription);

// Get all products by id
router.route('/get-product-by-id').post(getProductById);

// Get all products by description
router.route('/get-product-by-description').post(getProductByDescription);

// Create product no Image
router.route('/create-product-no-image').post(createProductNoImage);

// Edit product
router.route('/edit-product').post(editProduct);

module.exports = router;