const express = require('express');
const router = express.Router();
const {createProduct , getAllProducts, getProductByName, getProductByType, getProductByTypeAndName, getProductById, getProductByDescription} = require('../controllers/product');
const uploadFile = require('../middleware/upload');

// Create a product
router.route('/create-product').post(uploadFile.single('file'), createProduct);

// Get all products
router.route('/get-all-products').post(getAllProducts);

// Get all products by name similar to the input
router.route('/get-product-by-name').post(getProductByName);

// Get all products by type
router.route('/get-product-by-type').post(getProductByType);

// Get all products by type and name
router.route('/get-product-by-type-and-name').post(getProductByTypeAndName);

// Get all products by id
router.route('/get-product-by-id').post(getProductById);

// Get all products by description
router.route('/get-product-by-description').post(getProductByDescription);



module.exports = router;