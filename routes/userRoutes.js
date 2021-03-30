const router = require('express').Router();

const usersController = require('../controllers/usersController');

router.route('/signin')
      .post(usersController.signinUser)
router.route('/signup')
      .post(usersController.signupUser)

module.exports = router;