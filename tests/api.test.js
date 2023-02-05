const request = require('supertest');
const app = require('../index');
const User = require('../models/User');
const Post = require('../models/Post');

let token = '';
let id = '';
let username = '';

beforeAll(async () => {
    await User.deleteMany();
    await Post.deleteMany();
})

// test 1
describe('User Register', () => {
    it('should register new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: "rajat21",
                email: "rajat21@gmail.com",
                password: "1234"
            })
            expect(res.statusCode).toEqual(201)
    })
});

// test 2
describe('User Login', () => {
    it('should login existing user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: "rajat21",
                password: "1234"
            })
            expect(res.statusCode).toEqual(200)

        token = res._body.token;
        // console.log(token);
    })
});


// test 3
describe('Create Post', () => {
    it('should create a post', async () => {
        const res = await request(app)
            .post('/api/blog/')
            .send({
                title: "What is Lorem Ipsum?",
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                // createdBy: "rajat21"
            })
            .set('Authorization', `Bearer ${token}`)
            expect(res.statusCode).toEqual(200)
            username = res._body.createdBy;
            id = res._body._id;
            // console.log(res._body);
    })
});


// test 4
describe('Create Post 2', () => {
    it('should create a post', async () => {
        const res = await request(app)
            .post('/api/blog/')
            .send({
                title: "Some more Lorem Ipsum",
                desc: "Suspendisse vitae blandit lacus. Integer et neque fringilla, blandit nunc et, consectetur dui. Nullam id luctus metus, at posuere libero. Fusce eu lacus vel leo ullamcorper commodo sit amet quis erat. Nullam pellentesque et odio et tempor. Suspendisse placerat auctor nunc, sit amet commodo dolor lacinia nec. Nullam egestas facilisis urna. Phasellus in scelerisque orci, vitae placerat orci. Fusce erat leo, eleifend viverra feugiat rutrum, viverra id felis. Donec consectetur lacus sed quam rhoncus viverra. Cras pharetra dui pretium, blandit libero at, malesuada nunc. Vivamus et facilisis arcu. Quisque urna elit, pharetra id dictum ac, porta vel ipsum.",

            })
            .set('Authorization', `Bearer ${token}`)
            expect(res.statusCode).toEqual(200)
            // console.log(res._body);
    })
});

// test 5
describe('Get Posts', () => {
    it('should get all posts', async () => {
        const res = await request(app)
            .get('/api/blog/')
            expect(res.statusCode).toEqual(200)
            // console.log(res._body);
    })
});

// test 6
describe(`Get User's Posts`, () => {
    it('should get my posts', async () => {
        const res = await request(app)
            .get('/api/user/myposts')
            .set('Authorization', `Bearer ${token}`)
            expect(res.statusCode).toEqual(200)
            // console.log(res._body);
    })
});


// test 7
describe('Update Post', () => {
    it('should update the post', async () => {
        const res = await request(app)
            .put(`/api/blog/${id}`)
            .send({
                title: "Where does it come from?",
                desc: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.`,
                // createdBy: "rajat21"
            })
            .set('Authorization', `Bearer ${token}`)
            expect(res.statusCode).toEqual(200)

            // console.log(res._body);
    })
});


// test 8 
describe('Delete Post', () => {
    it('should delete the post', async () => {
        const res = await request(app)
            .delete(`/api/blog/${id}`)
            .set('Authorization', `Bearer ${token}`)
            expect(res.statusCode).toEqual(200)
    })
});


// test 9
describe(`Get User`, () => {
    it('should get info about user', async () => {
        const res = await request(app)
            .get(`/api/user/${username}`)
            expect(res.statusCode).toEqual(200)
            // console.log(res._body);
    })
});

//logging out
token = '';

// tests after log out

// test 10
describe('Create Post / logged out', () => {
    it('should not create a post', async () => {
        const res = await request(app)
            .post('/api/blog/')
            .send({
                title: "What is Lorem Ipsum? ",
                desc: "Lorem Ipsum is simply dummy  text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            })
            .set('Authorization', token)
            expect(res.statusCode).toEqual(401)
    })
});

// test 11
describe('Update Post / logged out', () => {
    it('should not update the post', async () => {
        const res = await request(app)
            .put(`/api/blog/${id}`)
            .send({
                title: "Where does it come from? ",
                desc: `Contrary to popular belief,  Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.`,

            })
            .set('Authorization', token)
            expect(res.statusCode).toEqual(401)
    })
});

// test 12
describe('Delete Post / logged out', () => {
    it('should not delete the post', async () => {
        const res = await request(app)
            .delete(`/api/blog/${id}`)
            .set('Authorization', token)
            expect(res.statusCode).toEqual(401)
    })
});


