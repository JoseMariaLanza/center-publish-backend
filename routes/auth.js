const { Router } = require('express');
const router = Router();

const { login, getProfile } = require('../core/auth/Infrastructure/controllers/auth')
const { header } = require('express-validator');
const { validateHeader } = require('../middlewares/headerValidator');
const { jwtDecoder } = require('../middlewares/jwtDecoder');

// router.use(jwtDecoder);

router.post('/',
  login,
);

router.get('/profile',
  [
    header('Authorization', 'You haven\'t sent user token.').not().isEmpty(),
    validateHeader
  ],
  getProfile
);


module.exports = router;