const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/auth");
const NotificationsController = require("../../controllers/NotificationController");

// Get User notification
router.get("/retrieve", auth, NotificationsController.getAllUserNotifications);


module.exports = router;