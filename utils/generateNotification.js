const Nofitication = require("../models/Notification");
const User = require("../models/User");
const Following = require("../models/Following");
const Profile =require("../models/Profile");
const asyncHandler = require('express-async-handler');


exports.generateUserData = asyncHandler(async (receiver, sender) => {
    const userData = {}
    // #1 Get sender's username - User Model
    const user = await User.findOne({ _id: sender });
    if(user) {
        userData.receiver = receiver
        userData.username = user.username
    } 
    

    // #2 Get sender's profile image path - Profile Model
    const profile = await Profile.findOne({ user : sender });
    if(profile) {
        userData.avatar = profile.profileImage
    }

    // #3 Get Follow back status - Follow Model
    const following = await Following.findOne({ user: receiver });
    const follower = following.followers.find(f => f.id == sender);
    if(follower) {
        userData.followerStatus = follower.following
    }

    return userData
});