const express = require('express');
const SignIn = require('../../Application/AuthenticationUseCases/SignIn')

const login = async (req, res = express.response) => {
  try {
    const signIn = new SignIn();
    console.log('IN AUTH CONTROLLER');
    return await signIn.getUserToken(req, res);
  } catch (error) {
    console.log('ERROR IN CONTROLLER! (login): ', error);
    return error
  }
}

const getProfile = async (req, res = express.response) => {
  try {
    const signIn = new SignIn();
    return await signIn.getUserProfile(req, res);
  } catch (error) {
    console.log('ERROR IN CONTROLLER! (getProfile): ', error);
    return error
  }
}

module.exports = { login, getProfile }