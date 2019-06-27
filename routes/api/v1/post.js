const express = require('express');
const { body } = require('express-validator');

const postController = require("../../../controller/api/v1/post");
const isAuth = require("../../../auth/is-auth-api");

const router = express.Router();

router.get("/getPosts", isAuth, postController.getPosts);
router.post(
    "/createPost",
    isAuth,
    [
        body('content')
            .trim()
            .isLength({min:1})
    ],
    postController.postCreatePost);

module.exports = router;