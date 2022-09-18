const { Router } = require('express');
const router = Router();

const { store, get, getUserPosts } = require('../core/posts/Infrastructure/controllers/post');
const { header } = require('express-validator');
const { CenterSchoolsApiAuth } = require('../middlewares/centerSchoolsApiAuth');

router.get('/',
    [
        header('Authorization', 'You have not sent user token.').not().isEmpty(),
        CenterSchoolsApiAuth
    ],
    get
);

router.get('/:user_id?',
    [
        header('Authorization', 'You have not sent user token.').not().isEmpty(),
        CenterSchoolsApiAuth
    ],
    getUserPosts
);

router.post('/new',
    [
        header('Authorization', 'You have not sent user token.').not().isEmpty(),
        CenterSchoolsApiAuth
    ],
    store
);


module.exports = router;