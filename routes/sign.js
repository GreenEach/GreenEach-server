const express = require('express');
const router = express.Router();
const authMiddleware = require('../controller/authMiddleware')
const { signController } = require('../controller');

router.post('/signup', signController.signup.post);
router.post('/signin', signController.signin.post);
router.use('/', authMiddleware);
router.post('/signout', signController.signout.post);

module.exports = router;
