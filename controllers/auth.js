const express = require('express');
const axios = require('axios');


const login = async (req, res = express.response) => {
    try {
        const { data } = await axios.post(`${process.env.CS_API}user/token/`, req.body);

        return res.status(200).json({
            ok: true,
            message: 'User authenticated',
            data
        });
    } catch (error) {
        console.log('ERROR: ', error);
        return res.status(error.response.status).json({
            ok: false,
            error: error.response.data
        });
    }
}

const profile = async (req, res = express.response) => {
    try {
        const { data } = await axios.get(`${process.env.CS_API}user/profile/`, {
            headers: {
                'Authorization': req.headers.authorization
            }
        });

        return res.status(200).json({
            ok: true,
            message: 'User profile retrieved successfuly.',
            data
        });
    } catch (error) {
        console.log(error);
        return res.status(error.response.status).json({
            ok: false,
            error: error.response.data
        });
    }
}

module.exports = { login, profile }