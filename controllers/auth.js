const express = require('express');
const axios = require('axios');

const login = async (req, res = express.response) => {
    try {
        const { data } = await axios.get('http://localhost:8000/api/1.1/user/profile/', {
            headers: {
                'Authorization': req.headers.authorization
            }
        });

        return res.json({
            ok: true,
            message: 'User authenticated',
            data
        });
    } catch (error) {
        return res.json({
            ok: false,
            error: error.response.data.detail
        }, error.response.status);
    }
}

module.exports = { login }