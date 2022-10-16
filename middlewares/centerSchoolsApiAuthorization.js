const axios = require('axios');
const { validationResult } = require('express-validator');


const CenterSchoolsApiSuperUserAuthorization = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                ok: false,
                errors: errors.mapped()
            });
        }

        const { data: userData } = await axios.get(`${process.env.CS_API}user/profile/`, {
            headers: {
                'Authorization': req.headers.authorization
            }
        });
        const user_id = userData.user;

        const { data: { user: userAccountdata } } = await axios.get(`${process.env.CS_API}user/account/${user_id}`, {
            headers: {
                'Authorization': req.headers.authorization
            }
        });
        const { is_superuser } = userAccountdata;
        console.log('USER ACCOUNT DATA: ', userAccountdata);

        if (!is_superuser) {
            return res.status(error.response.status).json({
                ok: false,
                error: error.response.data
            });
        }

        next();
    } catch (error) {
        console.log('Error at API Authorization Middleware: ', error);
        return res.status(error.response.status).json({
            ok: false,
            error: error.response.data
        });
    }
}

const CenterSchoolsApiAuthorization = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                ok: false,
                errors: errors.mapped()
            });
        }

        const { data: userData } = await axios.get(`${process.env.CS_API}user/profile/`, {
            headers: {
                'Authorization': req.headers.authorization
            }
        });
        const userId = userData.user;

        if (userId != req.params.user_id) {
            return res.status(403).json({
                ok: false,
                error: 'Unauthorized'
            });
        }

        next();
    } catch (error) {
        console.log('Error at API Authorization Middleware: ', error);
        return res.status(error.response.status).json({
            ok: false,
            error: error.response.data
        });
    }
}


module.exports = {
    CenterSchoolsApiSuperUserAuthorization,
    CenterSchoolsApiAuthorization
}
