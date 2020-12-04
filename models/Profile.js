const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    profileImage: {
        type: String,
    },
    website: {
        type: String,
    },
    bio: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    gender: {
        type: String
    }
});


module.exports = mongoose.model('Profile', ProfileSchema);