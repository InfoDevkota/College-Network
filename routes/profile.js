const express = require('express');

const profileController = require('../controller/profile');
const isAuth = require('../auth/is-auth');

const router = express.Router();

router.get('/me', isAuth, profileController.getMe);
router.post('/me', isAuth, profileController.postMe);
router.get('/me/edit', isAuth, profileController.getMeEdit);
router.get('/:username', profileController.getProfile);

module.exports = router;