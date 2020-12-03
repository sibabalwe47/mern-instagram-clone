const mongoose = require('mongoose');

const FollowingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    followers: [
        {
            id: String, 
            following: {
                type: Boolean, 
                default: false
            }
        }
    ],
    following: [
        {
            id: String
        }
    ]
});


module.exports = mongoose.model('Following', FollowingSchema);
