const AuthService = require('../Domain/Services/AuthService');

class AuthFacade {
  constructor() {
    // Code here...
  }


  async login(req, res) {
    try {
      const result = new AuthService();
      return await result.login(req.body, res);
    } catch (error) {
      console.log('ERROR IN FACADE!');
      return error;
    }
  }

  async store(req) {
    try {
      // Code here...
      // comunicates with app layer in corresponding service
    } catch (error) {
      // ApiResponse server error
    }
  }

  async update(req) {
    try {
      // Code here...
      // comunicates with app layer in corresponding service
    } catch (error) {
      // ApiResponse server error
    }
  }

  async delete() {
    try {
      // Code here...
      // comunicates with app layer in corresponding service
    } catch (error) {
      // ApiResponse server error
    }
  }
}

module.exports = AuthFacade;
