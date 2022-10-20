const { body, validationResult } = require('express-validator');
const AuthFacade = require('../../Infrastructure/AuthFacade');

class SignIn {
    async getUserToken(req, res) {
        try {
            body('email').isEmail();
            body('password').isLength({ min: 8 });

            // const errors = validationResult(req);
            validationResult(req).throw();

            // if (!errors.isEmpty()) {
            //   return res.status(400).json({
            //     ok: false,
            //     errors: errors.array()
            //   });
            // }

            const loginResult = new AuthFacade();
            return await loginResult.login(req, res);

        } catch (error) {

        }
    }

    async getUserProfile(req, res) {

    }
}

module.exports = SignIn;