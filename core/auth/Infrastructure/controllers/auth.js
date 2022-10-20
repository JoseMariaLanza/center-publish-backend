const express = require('express');
// const AuthFacade = require('../AuthFacade');
const SignIn = require('../../Application/AuthenticationUseCases/SignIn')

const login = async (req, res = express.response) => {
  try {
    // const loginResult = new AuthFacade();
    // return await loginResult.login(req, res);
    const signIn = new SignIn();
    return await signIn.getUserToken(req, res);
  } catch (error) {
    console.log('ERROR IN CONTROLLER!', error);
    return error
  }
}

const profile = async (req) => {
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