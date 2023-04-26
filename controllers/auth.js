const db = require('../config/db');
const User = db.user;
const Login = db.login;
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ErrorResponse = require('../utils/errorResponse');

// @desc  Register a new user
exports.register = async (req, res, next) => {
    const { fname, lname, ID, email, password } = req.body;
    console.log(req.body);
    try {

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        // console.log(hashPassword);

        const user = await User.create({
            fname,
            lname,
            ID,
            email,
            login_info: {
                email,
                ID,
                password:hashPassword
            }
        }, {    
            include: [Login]
        });
        res.status(201).json({
            success: true,
            message: 'Please login to continue',
            data: user
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Login 
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        // Check if user exists
        const user = await User.findOne({
            where: {
                email
            },
            include: [Login]
        });
        console.log(user);
        if (!user) {
            return next(new ErrorResponse('Invalid credentials', 401));
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.login_info.password);
        
        if (!isMatch) {
            return next(new ErrorResponse('Invalid credentials', 401));
        }

        // Create token
        const token = jwt.sign({
            email: user.email,
            ID: user.ID
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });
        res.status(200).json({
            success: true,
            token: token,
            message: 'Login successful'
        });
    }
    catch (err) {
        next(err);
    }
};

