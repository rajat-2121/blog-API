// const request = require('supertest');
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const app = require('../index');
// const User = require('../models/User');
// require('dotenv').config();
// const bcrypt = require('bcrypt');
// const { log } = require('console');
// const SECRET_KEY = process.env.JWT_SECRET_KEY;


const userOne = {
    username: "Rishi Raj",
    email: "rishi.raj.@gmail.com",
    password: "123456"
};
let token;


beforeEach( async () => {
    await User.deleteMany();
    const newUser = new User(userOne);
    await newUser.save();
});

// register (test 1)
test('should register a new user', async () => {
    const res = await request(app)
        .post('/api/auth/register')
        .send({
            username: "Rajat Prajapti",
            email: 'rajat.prajapati@gmail.com', 
            password: '2121'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
});



// login (test 2)
// test('should login existing user', async () => {
//     await request(app)
//         .post('/api/auth/login')
//         .send({
//             username: userOne.username,
//             password: userOne.password
//         })
//         .expect('Content-Type', /json/)
//         .expect(200)

//         const user = await User.findOne({username: userOne.username});
//         token = jwt.sign({id: user._id, username: user.username}, SECRET_KEY);

// });

// // Invalid password (test 3)
// test('should get an error', async () => {
//     await request(app)
//         .post('/api/auth/login')
//         .send({
//             username: userOne.username,
//             password: "111111"
//         })
//         .expect('Content-Type', /json/)
//         .expect(400)
// });



