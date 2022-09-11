const { Router } = require('express');
const router = Router();

const { login } = require('../controllers/auth');
const { header } = require('express-validator');
const { validateHeader } = require('../middlewares/headerVlidator');

router.get('/',
    [
        header('Authorization', 'You haven\' sent user token.').not().isEmpty(),
        validateHeader
    ],
    login
);


module.exports = router;