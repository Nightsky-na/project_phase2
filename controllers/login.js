const db = require('../config/db');
// const User = db.user;
const Login = db.login;

// @desc  Get all Login
exports.findAllLogin = async (req, res) => {
    try {
        const logins = await Login.findAll();
        res.status(200).json({
            success: true,
            data: logins
        });
    } catch (err) {
        // next(err);
        res.status(500).json({
            success: false,
            error: err
        });
    }
}


