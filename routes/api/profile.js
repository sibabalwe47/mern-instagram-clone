const express = require('express');
const { auth } = require('../../middleware/auth');
const router = express.Router();
const Profile =require("../../models/Profile");
const ProfileController = require("../../controllers/ProfileController");

// Edit Profile
router.post("/edit", auth, ProfileController.editProfile);

// Get Profile
router.get("/me", auth, ProfileController.getProfile);


module.exports = router;
 