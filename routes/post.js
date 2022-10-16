const { Router } = require('express');
const router = Router();

const { store, get, getUserPosts } = require('../core/posts/Infrastructure/controllers/post');
const { header } = require('express-validator');
const { CenterSchoolsApiAuthentication } = require('../middlewares/centerSchoolsApiAuthentication');
const { CenterSchoolsApiSuperUserAuthorization, CenterSchoolsApiAuthorization } = require('../middlewares/centerSchoolsApiAuthorization');

router.get('/',
    [
        header('Authorization', 'You have not sent user token.').not().isEmpty(),
        CenterSchoolsApiAuthentication,
        CenterSchoolsApiSuperUserAuthorization
    ],
    get
);

router.get('/:user_id?',
    [
        header('Authorization', 'You have not sent user token.').not().isEmpty(),
        CenterSchoolsApiAuthentication,
        CenterSchoolsApiAuthorization
    ],
    getUserPosts
);

router.post('/new',
    [
        header('Authorization', 'You have not sent user token.').not().isEmpty(),
        CenterSchoolsApiAuthentication
    ],
    store
);


module.exports = router;