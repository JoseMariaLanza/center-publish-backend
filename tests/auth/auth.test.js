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


describe('Auth', () => {
    test('User Authenticated - Http OK.', async () => {
        const userData = {
            email: 'lanza.josemaria@gmail.com',
            password: '123456'
        };

        await api
            .post('/api/auth').send(userData)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Empty user data - Http Bad Request.', async () => {
        const userData = {};

        await api
            .post('/api/auth').send(userData)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('Wrong password - Http Bad Request.', async () => {
        const userData = {
            email: 'lanza.josemaria@gmail.com',
            password: '12345'
        };

        await api
            .post('/api/auth').send(userData)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('Wrong email - Http Bad Request.', async () => {
        const userData = {
            email: 'lanza.josemaria@gmail',
            password: '123456'
        };

        await api
            .post('/api/auth').send(userData)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('User can\'t get his profile data if not logged in - Http Unauthenticated.', async () => {

        await api
            .get('/api/auth/profile')
            .set('Authorization', null)
            .expect(401)
    })
});


afterAll(async () => {
    await mongoose.connection.close();
});

