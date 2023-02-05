const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../index');
const User = require('../models/User');
const Post = require('../models/Post');
require('dotenv').config();
const userOne = {
    username: "Rishi Raj",
    email: "rishi.raj.@gmail.com",
    password: "123456",
    _id: ""
}

let post, id, token='';
const SECRET_KEY = process.env.JWT_SECRET_KEY;
// const user = User.findOne({username: userOne.username});
// token = jwt.sign({id: user._id, username: user.username}, SECRET_KEY);

// beforeAll(async () => {
//     const response = await request(app)
//         .post('/api/auth/login')
//         .send({
//             username: userOne.username,
//             password: userOne.password
//         })
//     const {user, token1} = response;
//     token = token1;
// });

// user login (test 0)
test('should login existing user', async () => {
    const response = await request(app)
        .post('/api/auth/login')
        .send({
            username: userOne.username,
            password: userOne.password
        })
        .expect('Content-Type', /json/)
        .expect(200)

        const user = await User.findOne({username: userOne.username});
        userOne._id = user._id;
        // token = jwt.sign({id: user._id, username: user.username}, SECRET_KEY);
        // console.log(token);
});

// Invalid password (test 3)
test('should get an error', async () => {
    await request(app)
        .post('/api/auth/login')
        .send({
            username: userOne.username,
            password: "111111"
        })
        .expect('Content-Type', /json/)
        .expect(400)
});



// Get Post (test 1)
test('get all posts', async () => {
    await request(app)
        .get('/api/blog/')
        .expect('Content-Type', /json/)
        .expect(200)
});


// Create Post (test 2)
test('logged-in user -> create post', async () => {

    token = jwt.sign({id: userOne._id, username: userOne.username}, SECRET_KEY);

    const response = await request(app)
        .post('/api/blog/')
        .send({
            title: "What is Lorem Ipsum?",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            createdBy: userOne.username
        })
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)

        post = response;
        id = post._id;
});

// Update post (test 3)
test('logged-in user -> update post', async () => {

    token = jwt.sign({id: userOne._id, username: userOne.username}, SECRET_KEY);

    await request(app)
        .put(`/api/blog/${id}`)
        .send({
            title: "Where does it come from?",
            desc: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`

        })
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
});

// delete post (test 4)
test('logged-in user -> delete post', async () => {

    token = jwt.sign({id: userOne._id, username: userOne.username}, SECRET_KEY);

    await request(app)
        .delete(`/api/blog/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
});

module.exports = token;