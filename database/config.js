require('dotenv').config();
const mongoose = require('mongoose');

const { NODE_ENV, MONGO_DB_URI, MONGO_DB_URI_TEST } = process.env;

const connectionString = NODE_ENV === 'test'
    ? MONGO_DB_URI_TEST
    : MONGO_DB_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(connectionString, { useNewUrlParser: true });
        const connectionState = mongoose.connection.db.s.client.topology.s.state;

        console.log(`Connection state: ${connectionState}!.`);
        return connectionState;
    } catch (error) {
        (mongoose.connection) && mongoose.connection.close();
        console.log('Error at connectDb: ', error);
        throw error;
    }
}

const closeDbConnection = async () => {
    try {
        await mongoose.connection.close();

        console.log('DB disconected!.');
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    connectDb,
    closeDbConnection
}