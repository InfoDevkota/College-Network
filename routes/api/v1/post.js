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
    postController.postCreatePost
);
router.get("/post/:postId", isAuth, postController.getPost);
router.put("/post/:postId", isAuth, postController.putPost);
router.put("/like/:postId", isAuth, postController.putLike);
router.put("/unlike/:postId", isAuth, postController.putUnLike);
router.delete("/post/:postId", isAuth, postController.deletePost);

module.exports = router;