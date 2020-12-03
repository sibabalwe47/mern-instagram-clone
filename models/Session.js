const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    device: {
        type: String,
    },
    os: {
        type: String
    },
    location: {
        type: String
    },
    token: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Session', SessionSchema);