const { connectDb, closeDbConnection } = require('../database/config')


describe('Check DB connection', () => {
    test('Connect DB', async () => {
        const connectionResult = await connectDb();

        expect(await connectionResult).toBe('connected');
    });

    test('Close DB connection', async () => {
        await connectDb();
        const dbDisconnected = await closeDbConnection();
        expect(dbDisconnected).toBe(true);

    })
});
