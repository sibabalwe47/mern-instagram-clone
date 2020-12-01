const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    filepaths: [
        {
            originalName: String,
            location: String,
            size: String
        }
    ],
    caption: {
        type: String,
    },
    location: {
        type: String,
    },
    taggedUsers: [
        {
            _id: {
                type: String
            }
        }
    ],
    comments: [
        {
            text: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now()
            },
            likes: {
                type: String
            }
        }
    ],
    likes: [
        {
            userId: {
                type: String
            }
        }
    ]
},
{
    timestamps: true
}
);


module.exports = mongoose.model('Post', PostSchema);