const Profile = require("../models/Profile");
const asyncHandler = require('express-async-handler');

exports.generateProfile = asyncHandler(async (id) => {
    let userProfile = new Profile({
        user: id
    });
    await userProfile.save();
});