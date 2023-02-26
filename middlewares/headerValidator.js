const { response } = require('express');
const { validationResult } = require('express-validator');


const validateHeader = (req, res = response, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('ERROR/S AT VALIDATE HEADER: ', errors);
    return res.status(400).json({
      ok: false,
      errors: errors.mapped()
    });
  }

  next();
}


module.exports = { validateHeader }
