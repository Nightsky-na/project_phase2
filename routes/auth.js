const express = require('express');
const router = express.Router();
const {register, login} = require('../controllers/auth');

// Register a new user
router.route('/register').post(register);

// Login
router.route('/login').post(login);

module.exports = router;