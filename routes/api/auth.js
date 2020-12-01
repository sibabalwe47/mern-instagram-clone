const express = require('express');
const router = express.Router();
const User = require('../../controllers/UserController');

// Sign Up
router.post("/register", User.reqisterUser);

// Login
router.post("/login", User.loginUser);




module.exports = router;