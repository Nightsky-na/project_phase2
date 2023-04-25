const express = require('express');
const router = express.Router();
const {createUser, findAllUser, findOneUser, updateUser, deleteUser, getUserByFname, getUserByEmail} = require('../controllers/user');

// get all users
router.route('/get-all-users').post(findAllUser);

// get a user
router.route('/get-user-id').post(findOneUser);

// create a user
router.route('/create-user').post(createUser);

// update a user
router.route('/update-user').post(updateUser);

// delete a user
router.route('/delete-user').post(deleteUser);

// ==== Basic CRUD ====

router.route('/get-user-by-fname').post(getUserByFname);

router.route('/get-user-by-email').post(getUserByEmail);

// === Advanced CRUD ====


module.exports = router;