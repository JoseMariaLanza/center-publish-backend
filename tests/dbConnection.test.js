const mongoose = require('mongoose');
const { connectDb, closeDbConnection } = require('../database/config')


describe('Check DB connectionz', () => {
    test('Connect DB', async () => {
        const connectionResult = await connectDb();

        expect(connectionResult).toBe(true);
    });

    test('Close DB connection', async () => {
        await connectDb();
        const dbDisconnected = closeDbConnection();
        expect(dbDisconnected).toBe(true);

    })
});


afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
})

