const jwt = require('jsonwebtoken');

const jwtDecoder = (req, res, next) => {
  try {
    const decoded = jwt.decode(req.body.token, process.env.JWT_SECRET);
    req.body = decoded;

    next();
  } catch (error) {
    console.log('error in decoder: ', error);
    return error.status(res.status).json({
      ok: false,
      error: res.message,
    });
  }
};

module.exports = { jwtDecoder };
