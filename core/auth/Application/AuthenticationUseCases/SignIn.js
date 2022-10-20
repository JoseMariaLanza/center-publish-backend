// const { body, validationResult } = require('express-validator');
const AuthFacade = require('../../Infrastructure/AuthFacade');

class SignIn {
  async getUserToken(req, res) {
    try {
      // body('email').isEmail();
      // body('password').isLength({ min: 8 });

      // // const errors = validationResult(req);
      // validationResult(req).throw();

      // if (!errors.isEmpty()) {
      //   return res.status(400).json({
      //     ok: false,
      //     errors: errors.array()
      //   });
      // }

      const authResult = new AuthFacade();
      return await authResult.login(req, res);

    } catch (error) {
      console.log('ERROR IN USE CASE (SignIn): ', error);
    }
  }

  async getUserProfile(req, res) {
    try {
      const authResult = new AuthFacade();
      return await authResult.profile(req, res);

    } catch (error) {
      console.log('ERROR IN USE CASE (getUserProfile): ', error);
    }
  }
}

module.exports = SignIn;