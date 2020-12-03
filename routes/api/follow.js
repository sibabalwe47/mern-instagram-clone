const express = require('express');
const router = express.Router();
const FollowController = require("../../controllers/FollowController");
const { auth } = require("../../middleware/auth");

// Request to following
router.post("/:receiver/me/:sender", auth, FollowController.requestToFollow)

// Get a users followers
router.get("/:id/followers", auth, FollowController.getUserFollowers);

// Follow back

router.post("/:sender/followback/", auth, FollowController.requestToFollowBack)

// Delete follow
router.delete("/:id/unfollow", auth, FollowController.requestToUnfollow)


module.exports = router;