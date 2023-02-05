const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');

router.get("/myposts", auth, async (req, res) => {
    try {
        const myPosts = await Post.find({createdBy: req.username});
        res.status(200).json(myPosts);
    } catch (error) {
        res.status(500).json(error);
    }
});

// create post
router.post("/", auth, async (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        desc: req.body.desc,
        createdBy: req.username
    });
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

// update post
router.put("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.createdBy === req.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, 
                    {$set: req.body},
                    {new: true}
                );
                res.status(200).json(updatedPost);
            } catch (error) {
                res.status(500).json(error);     
            }
        } else {
            res.status(401).json(`you can update your posts only!`);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// delete post
router.delete("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.createdBy === req.username) {
            try {
                const deletedPost = await Post.findByIdAndDelete(req.params.id);
                res.status(200).json(`Post has been deleted`);
            } catch (error) {
                res.status(500).json(error);     
            }
        } else {
            res.status(401).json(`you can delete your posts only!`);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get post by id
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;