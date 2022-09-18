const {Router} = require('express');
const router = Router();

const { login } = require('../controllers/auth');

router.get('/', login);


module.exports = router;