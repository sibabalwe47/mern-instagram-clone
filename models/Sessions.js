const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    location: {
        type: String
    },
    date: {
        type: Date
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Session', SessionSchema);