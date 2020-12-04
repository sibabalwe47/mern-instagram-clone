const Notification = require("../models/Notification");
const asyncHandler = require("express-async-handler");


/*
    Data: Requester username, date, profile image, follow back status
*/
exports.userFollowedNotification = asyncHandler(async (user) => {
    const notification = new Notification({
        user: user.receiver,
        type: 'follow',
        notification: {
            content: 'started following you.',
            username: user.username,
            profileImagePath: user.avatar,
            postImagePath: '',
            following: user.followerStatus
        }

    });

    await notification.save();
});

/*
    Data: Requester username, date, profile image, follow back status
*/
exports.userMentionedNotification = asyncHandler(async () => {});

/*
    Data: Requester username, date, profile image, follow back status
*/
exports.userLikedPostNotification = asyncHandler(async () => {});

/*
    Data: User id is retrieved from stored in token
*/
exports.getAllUserNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find({ user: req.user._id });
    res.json(notifications);
})
