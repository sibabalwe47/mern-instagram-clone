const mongoose = require("mongoose");


const NotificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String
    },
    notification: {
        content: String,
        username: String,
        profileImagePath: String,
        postImagePath: String,
        following: Boolean
    },
    seen: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});


module.exports = mongoose.model('Notification', NotificationSchema);