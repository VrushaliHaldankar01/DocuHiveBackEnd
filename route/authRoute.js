const { signup, login } = require('../controller/authController');
const { verifyEmail } = require('../controller/verifyEmail');
const router = require('express').Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/verifyEmail').get(verifyEmail);

module.exports = router;
