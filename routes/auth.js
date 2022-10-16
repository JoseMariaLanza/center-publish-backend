const { Router } = require('express');
const router = Router();

const { login, profile } = require('../controllers/auth');
const { header } = require('express-validator');
const { validateHeader } = require('../middlewares/headerValidator');

router.post('/',
    login
);

router.get('/profile',
    [
        header('Authorization', 'You haven\' sent user token.').not().isEmpty(),
        validateHeader
    ],
    profile
);


module.exports = router;