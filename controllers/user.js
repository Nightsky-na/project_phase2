const ErrorResponse = require('../utils/errorResponse');
const db = require('../config/db');
const User = db.user;
const Login = db.login;
const Sequelize = require('sequelize');




// @desc   Create a new user
exports.createUser = async (req, res) => {
    try {
        const { fname, lname, ID, email, password } = req.body;
        const user = await User.create({
            fname,
            lname,
            ID,
            email,
            login_info: {
                email,
                ID,
                password
            }
        }, {
            include: [Login]
        });
        res.status(201).json({
            success: true,
            data: user
        });
    } catch (err) {
        // next(err);
        res.status(500).json({
            success: false,
            error: err
        });
    }
}

// @desc    Get all users
exports.findAllUser = async (req, res) => {
    console.log('findAllUser');
    try {
        const users = await User.findAll();
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (err) {
        // next(err);
        res.status(500).json({
            success: false,
            error: err
        });
    }
}

// @desc    Get a user
exports.findOneUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.body.id);
        if (!user) {
            return next(new ErrorResponse(`User not found with id ${req.params.id}`, 404));
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        // next(err);
        res.status(500).json({
            success: false,
            error: err
        });
    }
}

// @desc    Update a user
exports.updateUser = async (req, res) => {
    try {
        const { fname, lname, ID, email } = req.body;
        const user = await User.update({
            fname,
            lname,
            ID,
            email
        }, {
            where: {
                ID: req.body.id
            }
        });
        if (!user) {
            return next(new ErrorResponse(`User not found with id ${req.params.id}`, 404));
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        // next(err);
        res.status(500).json({
            success: false,
            error: err
        });
    }
}

// @desc    Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.body.id;
        await Login.destroy({
            where: {
                ID: userId
            }
        });

        const user = await User.destroy({
            where: {
                ID: userId
            }
        });

        if (!user) {
            return next(new ErrorResponse(`User not found with id ${req.params.id}`, 404));
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err
        });
    }
}

// @desc   Get User by fname
exports.getUserByFname = async (req, res) => {
    try {
        // console.log(`%${req.body.fname}%`);
        console.log(Sequelize.Op.like);
        const user = await User.findAll({
            where: {
                // fname: req.body.fname
                fname: {
                    [Sequelize.Op.like]: `%${req.body.fname}%`
                }
            }
        });
        console.log(user);
        if (!user) {
            return next(new ErrorResponse(`User not found with fname ${req.params.fname}`, 404));
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        // next(err);
        res.status(500).json({
            success: false,
            error: err
        });
    }
}

// @desc  Get User by contain this string in email
exports.getUserByEmail = async (req, res) => {
    try {
        
        const user = await User.findAll({
            where: {
                email: {
                    [Sequelize.Op.like]: '%' + req.body.email + '%'
                }
            }
        });
        if (!user) {
            return next(new ErrorResponse(`User not found with email ${req.params.email}`, 404));
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        // next(err);
        res.status(500).json({
            success: false,
            error: err
        });
    }
}
