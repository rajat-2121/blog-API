const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.userId});
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get my posts
router.get("/myposts", auth, async (req, res) => {
    try {
        const myPosts = await Post.find({createdBy: req.username});
        res.status(200).json(myPosts);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get user info
router.get("/:username", async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username});
        const {password, ...others} = user._doc;

        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;