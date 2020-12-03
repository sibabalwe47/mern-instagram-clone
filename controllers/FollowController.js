const Following = require("../models/Following");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

exports.requestToFollow = asyncHandler(async (req, res) => {
    const { receiver, sender } = req.params;
    let receiverFollowing = await Following.findOne({ user : receiver});
    if(receiverFollowing) {
        receiverFollowing.followers.forEach(f => {
            if(f.id.toString() != sender.toString()) {
                console.log(f.id)
                console.log(sender);
                receiverFollowing.followers.push({id: sender});
                const updatedFollowers = receiverFollowing.save();
                return res.json(receiverFollowing);
            }
        })
    } else {
        receiverFollowing = new Following({
            user: receiver,
            followers: [{id: sender}]
        });
        const newReceiverFollowing = await receiverFollowing.save();
        res.json(newReceiverFollowing);
    }
        
});

exports.getUserFollowers = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const follwing = await Following.findOne({ user: id });
    if(follwing){
        const followers = follwing.followers;
        return res.json(followers)
    }
    res.json([]);
});

exports.requestToFollowBack = asyncHandler(async (req, res) => {
    const loggedInUser = req.user._id;
    const sender = req.params.sender;
    const following = await Following.findOne({ user: loggedInUser });

    if(following) {
        // Change following to true
        following.followers.forEach(f => {
            if(f.id == sender) {
                f.following = true
            }
        });

        // Add to sender to following
        following.following.push({ id: sender });
        const updatedFollowing = await following.save();
        res.json(updatedFollowing);
    }
});

exports.requestToUnfollow = asyncHandler(async (req, res) => {
    
});