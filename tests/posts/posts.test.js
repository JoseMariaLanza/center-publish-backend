const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
require('dotenv').config();

const { NODE_ENV, MONGO_DB_URI, MONGO_DB_URI_TEST } = process.env;

const connectionString = NODE_ENV === 'test'
? MONGO_DB_URI_TEST
: MONGO_DB_URI;

beforeAll(async () => {
    await mongoose.connect(connectionString);
});

const api = supertest(app);

describe('Posts', () => {
    test('Unauthenticated user can\'t get posts - Http Bad Request.', async () => {
        await api
            .get('/api/posts')
            .expect('Content-Type', /application\/json/)
            .expect(400)
    })

    // test('Posts ares returned as json.', async () => {
    //     const userData = {
    //         email: 'lanza.josemaria@gmail.com',
    //         password: '123456'
    //     };

    //     const res = await api
    //         .post('/api/auth')
    //         .send(userData)
    //         .set('Accept', 'application/json')
    //         .expect(404)
    //         .then(res => {
    //             assert(res.body.token, true)
    //         })

    //     console.log('RESPONSE TEST: ', res);

    //     // await api
    //     //     .get('/api/posts')
    //     //     .expect(200)
    //     //     .expect('Content-Type', /application\/json/)
    // })
});


afterAll(async () => {
    await mongoose.connection.close();
});
