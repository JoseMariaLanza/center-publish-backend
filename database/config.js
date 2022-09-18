const { connect } = require('mongoose');

const dbConnection = async () => {
    try {
        await connect(process.env.DB_CONNECTION);

        console.log('Connection successful!.');
    } catch (error) {
        console.log(error);
        // throw new Error('Error: DB not initialized.');
    }
}

module.exports = {
    dbConnection
}