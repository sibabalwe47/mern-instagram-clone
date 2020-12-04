const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");
const User = require('../models/User');


exports.createPost = asyncHandler(async (req, res) => {
    const files = req.files;
    const { caption }  = req.body;
    const user = req.user._id;

    console.log(files);

    if(!user) {
        return res.status(401).send('Post cannot be created for user that does not exist');
    } else {

        let post = new Post({
            user: req.user._id,
            filepaths: files,
            caption: caption
        })

        await post.save();

        res.json(post);
    }
})

exports.getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

exports.getUserPosts = asyncHandler(async (req, res) => {
    const username = req.params.username;
    const user = await User.findOne({ username });
    if(user) {
        const posts = await Post.find({user: user._id});
        if(posts) {
            return res.status(200).json(posts)
        } else {
            return res.status(500).send('You have no posts yet')
        }
    } else {
       return res.status(500).send('User does not exist')
    }
    
});

exports.editCaption = asyncHandler(async (req, res) => {
    const post = await Post.findOne({_id: req.user._id && req.params.id});
    if(post) {
        post.caption = req.body.caption || post.caption;
        const updatedCaption = post.save();
        res.json(post);
    }
});

exports.addPostComment = asyncHandler(async (req,res) => {
    const post = await Post.findOne({_id: req.user._id && req.params.id});
    if(post) {
        post.comments.push({ text: req.body.text });
        const updatedComments = post.save();
        res.json(post);
    }
});

exports.editPostComment = asyncHandler(async (req, res) => {
    const post = await Post.findOne({_id: req.user._id && req.params.id});
    if(post) {
        post.comments.forEach(c => {
            if(c._id == req.params.commentId) {
                c.text = req.body.text
            }
        });
        const updatedComments = await post.save();
        res.json(post);
    }
});

exports.deletePostComment = asyncHandler(async (req, res) => {
    const post = await Post.findOne({_id: req.user._id && req.params.id});
    if(post) {
        const comments = post.comments.filter(c => c._id != req.params.commentId);
        post.comments = comments;
        const updatedComments = await post.save();
        res.json(post);
    }
})