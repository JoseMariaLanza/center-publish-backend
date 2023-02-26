const jwt = require('jsonwebtoken');

const jwtEncoder = (data) => {
  try {
    return jwt.sign(data, process.env.JWT_SECRET);
  } catch (error) {
    console.log('error in encoder', error);
    // return res.status(404).json({ msg: "Hubo un error" });
  }
};

module.exports = { jwtEncoder }
