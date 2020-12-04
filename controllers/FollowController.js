const Following = require("../models/Following");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { generateUserData } = require("../utils/generateNotification");
const { userFollowedNotification } = require("./NotificationController");

exports.requestToFollow = asyncHandler(async (req, res) => {
    let receiverFollowing = await Following.findOne({ user : req.params.receiver });

    if(receiverFollowing) {
        receiverFollowing.followers.push({ id: req.params.sender });
        const updatedReceiverFollower = await receiverFollowing.save();

        // Get user data for notification
        const userData = await generateUserData(req.params.receiver, req.params.sender);

        // Genearate notification
        userFollowedNotification(userData);

        // Send updated receiver follower
        return res.json(updatedReceiverFollower);
    } else {
        receiverFollowing = new Following({
            user: receiver,
            followers: [{id: req.params.sender}]
        });
        const newReceiverFollowing = await receiverFollowing.save();
        res.json(newReceiverFollowing);
    }
});

exports.getUserFollowers = asyncHandler(async (req, res) => {
    const follwing = await Following.findOne({ user: req.params.id });
    if(follwing){
        const followers = follwing.followers;
        return res.json(followers)
    }
    res.json([]);
});

exports.getUserFollowing = asyncHandler(async (req, res) => {
    const follwing = await Following.findOne({ user: req.params.id });
    if(follwing){
        const following = follwing.following;
        return res.json(following)
    }
    res.json([]);
});

exports.requestToFollowBack = asyncHandler(async (req, res) => {
    const following = await Following.findOne({ user: req.user._id });

    if(following) {
        // Change following to true
        following.followers.forEach(f => {
            if(f.id == req.params.sender) {
                f.following = true
            }
        });

        // Add to sender to following
        following.following.push({ id: req.params.sender });
        const updatedFollowing = await following.save();
        res.json(updatedFollowing);
    }
});

exports.requestToUnfollow = asyncHandler(async (req, res) => {
    const following = await Following.findOne({ user : req.user._id });
    if(following){
        const followers = following.followers.filter(f => f.id != req.params.id);
        following.followers = followers;
        const updatedFollowing = await following.save();
        return res.json(updatedFollowing);
    }
});