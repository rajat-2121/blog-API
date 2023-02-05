const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

// register
router.post("/register", async (req, res) => {
    try {

        // const salt = await bcrypt.genSalt(10);
        // const hashedPass = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        const user = await newUser.save();

        const token = jwt.sign({id: user._id, username: user.username}, SECRET_KEY);
        res.status(201).json({user, token});

    } catch (error) {
        res.status(500).json(error);
    }
});

// login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user) {
            res.status(400).json(`Wrong credentials!`);
            return;
        }

        if(user.password != req.body.password) {
            res.status(400).json(`Wrong credentials!`);
            return;
        } 

        const token = jwt.sign({id: user._id, username: user.username}, SECRET_KEY);

        const {password, ...others} = user._doc;
        res.status(200).json({user: others,token: token});

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;