const AuthRepository = require('../Repositories/AuthRepository');

class AuthService {
  async login(payload, res) {
    try {
      const user = new AuthRepository();
      return await user.getToken(payload, res);
    } catch (error) {
      console.log('ERROR IN SERVICE!', error);
      return error;
    }
  }

  async store($request) {
    // const modelName = new Auth();

    // Code here...

    //return 0
  }

  async update() {
    // const modelName = new Auth();

    // Code here...

    //return 0
  }

  async delete($id) {
    // const modelName = new Auth();

    // Code here...

    //return 0
  }
}

module.exports = AuthService;
