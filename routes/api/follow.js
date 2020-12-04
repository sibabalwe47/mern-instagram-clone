const express = require('express');
const router = express.Router();
const FollowController = require("../../controllers/FollowController");
const { auth } = require("../../middleware/auth");

// Request to follow
router.post("/:receiver/me/:sender", auth, FollowController.requestToFollow);

// Get a users followers
router.get("/:id/followers", auth, FollowController.getUserFollowers);

// Get user following
router.get("/:id/following", auth, FollowController.getUserFollowing);

// Follow back
router.post("/:sender/followback/", auth, FollowController.requestToFollowBack);

// Delete follower
router.delete("/:id/unfollow", auth, FollowController.requestToUnfollow);


module.exports = router;