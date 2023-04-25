const express = require('express');
const router = express.Router();

const {findAllLogin} = require('../controllers/login');

// get all Login 
router.route('/get-all-login').post(findAllLogin);

module.exports = router;