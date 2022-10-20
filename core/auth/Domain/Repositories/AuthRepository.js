const axios = require('axios');

class AuthRepository {
  async createUser(payload, res) {
    // const modelName = new Auth();

    // Code here...

    //return 0
  }

  async getToken(payload, res) {
    try {
      const { data } = await axios.post(`${process.env.CS_API}user/token/`, payload);

      return res.status(200).json({
        ok: true,
        message: 'User authenticated',
        data
      });
    } catch (error) {
      console.log('ERROR IN REPOSITORY!');
      return res.status(error.response.status).json({
        ok: false,
        error: error.response.data
      });
    }
  }

  async getUserAccountData(token, res) {
    try {
      const { data } = await axios.get(`${process.env.CS_API}user/profile/`, {
        headers: {
          'Authorization': token
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

  async updateUserprofile(payload, res) {
    // const modelName = new Auth();

    // Code here...

    //return 0
  }

  async destroy(id, res) {
    // const modelName = new Auth();

    // Code here...

    //return 0
  }
}

module.exports = AuthRepository;
