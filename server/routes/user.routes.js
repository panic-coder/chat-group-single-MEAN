const express = require('express');
const router = express.Router();
const User = require('../controller/user.controller');
const auth = require('../auth');

router.post('registration', User.registration);

module.exports = router;