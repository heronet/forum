const postsController = require('../controllers/postsController');
const tokenVerify = require('../middlewares/token-verify');

const router = require('express').Router();

router.route('/')
      .post(tokenVerify, postsController.createPost)

module.exports = router;