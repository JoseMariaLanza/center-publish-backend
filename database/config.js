require('dotenv').config();
const { connect, connection } = require('mongoose');

const connectDb = async () => {
    try {
        await connect(process.env.DB_CONNECTION);

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