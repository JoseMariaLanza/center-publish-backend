const axios = require('axios');
const { validationResult } = require('express-validator');


const CenterSchoolsApiAuthentication = async (req, res, next) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                ok: false,
                errors: errors.mapped()
            });
        }

        await axios.get(`${process.env.CS_API}user/profile/`, {
            headers: {
                'Authorization': req.headers.authorization
            }
        });

        next();
    } catch (error) {
        console.log('Error at API Authentication Middleware: ', error);
        return res.status(error.response.status).json({
            ok: false,
            error: error.response.data
        });
    }
}


module.exports = {
    CenterSchoolsApiAuthentication
}
