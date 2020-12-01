const asyncHandler = require('express-async-handler');
const Profile = require('../models/Profile');



exports.getProfile = asyncHandler(async (req, res) => {
    const profile = await Profile.findOne({user: req.user._id});
    if(!profile) return res.status(401).send("Profile does not exist");
    res.json(profile);
});


exports.editProfile = asyncHandler(async (req, res) => {
    const profile = await Profile.findOne({user: req.user._id});
    if(profile) {
        profile.website = req.body.website || profile.website;
        profile.bio = req.body.bio || profile.bio;
        profile.phoneNumber = req.body.phoneNumber || profile.phoneNumber;
        profile.gender = req.body.gender || profile.gender;

        const updatedProfile = await profile.save();

        res.json(updatedProfile);
    } else {
        res.status(500).send('Invalid user data');
    }
});
