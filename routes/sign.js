const express = require('express');
const router = express.Router();

const {signController} = require('../controller');

router.post('/signup', signController.signup.post);

module.exports = router;