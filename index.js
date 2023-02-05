const { log } = require('console');
const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const token1 = require('./tests/posts.test');
require('dotenv').config();

const app = express();

// database connection
const databaseURL = process.env.MONGODB_URL;
mongoose.set('strictQuery', true);
mongoose.connect(databaseURL, (error) => {
    if(!error) {
        console.log(`database connected!`);
    } else {
        console.log(error);
    }
});

app.use(express.json());
app.use((req, res, next) => {
    console.log(`HTTP Method- ${req.method}, URL- ${req.url}`);
    next();
});
app.use("/api/auth", authRoute);
app.use("/api/user", usersRoute);
app.use("/api/blog", postRoute);

console.log(token1);

// server listener
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server listening on port ${port}`));

module.exports = app;