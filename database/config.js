require('dotenv').config();
const { connect, connection } = require('mongoose');

const { NODE_ENV, MONGO_DB_URI, MONGO_DB_URI_TEST } = process.env;

const connectionString = NODE_ENV === 'test'
    ? MONGO_DB_URI_TEST
    : MONGO_DB_URI;

const connectDb = async () => {
    try {
        await connect(connectionString);

        console.log('Connection successful!.');
        return true;
    } catch (error) {
        console.log(error);
        return false;
        // throw new Error('Error: DB not initialized.');
    }
}

const closeDbConnection = () => {
    try {
        connection.close()

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