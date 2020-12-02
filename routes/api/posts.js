const express = require('express');
const PostController = require('../../controllers/PostController');
const { auth } = require('../../middleware/auth');
const router = express.Router();
const upload = require("../../services/imageupload");
const singleUpload = upload.array('files');

// Create Post
router.post("/create", auth, singleUpload, PostController.createPost);

// Get All Posts
router.get("/", auth, PostController.getAllPosts);

// Get User Posts
router.get("/:username", auth, PostController.getUserPosts);

// Update User Post Caption
router.post("/:id/caption", auth, PostController.editCaption);

// Add User Post Comments
router.post("/:id/comments", auth, PostController.addPostComment)

// Update User Post Comments
router.put("/:id/comments/:commentId", auth, PostController.editPostComment)

// Delete Use Post Comments
router.delete("/:id/comments/:commentId", auth, PostController.deletePostComment);

module.exports = router;