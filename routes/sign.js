const express = require('express');
const router = express.Router();

const {signController} = require('../controller');

router.post('/signup', signController.signup.post);
router.post('/signin', signController.signin.post);

module.exports = router;