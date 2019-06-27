const express = require('express');

const postController = require('../controller/post');
const isAuth = require('../auth/is-auth');

const router = express.Router();

router.post("/createPost", isAuth, postController.postCreatePost);

module.exports = router;