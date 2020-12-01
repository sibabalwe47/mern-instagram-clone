const User = require("../models/User");
const asyncHandler = require('express-async-handler');
const bcrypt = require("bcrypt");
const { encryptPassword, decodePassword } = require('../utils/passwordHandlers');
const { generateToken } = require("../utils/generateToken");
const { generateProfile } = require("../utils/generateProfile");
const dotenv = require("dotenv");
dotenv.config({path: '../config/config.env'});

exports.reqisterUser = asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body;
    let user = await User.findOne({email});

    if(user) {
        return res.status(401).send("Account already exists");
    } else {
        const encryptedPass = await encryptPassword(password);
        user = new User({
            name,
            username,
            email,
            password: encryptedPass
        });

        await user.save();

        await generateProfile(user._id);

        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    }

    
});

exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});

    if(user) {
        const matchPass = await bcrypt.compare(password, user.password);
        if(!matchPass) {
            return res.status(401).send("Invalid email or password");
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(500).send('Account does not exist');
    }

});