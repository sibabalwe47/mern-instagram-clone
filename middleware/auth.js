const jwt = require("jsonwebtoken");
const User = require('../models/User');
const asyncHandler = require("express-async-handler");


exports.auth = asyncHandler(async (req, res, next) => {
    console.log('Testing')
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, "tokensecret");
            req.user = await User.findById(decoded.id).select("-password");
            next();
            return;
        } catch (error) {
            console.log(error.message);
            res.status(401).json({message: "No authorized token, Token not found."})
        }
    } 

    if (!token) {
        return res.status(401).json({ message: "No authorization token found" });
    }
    next();

});