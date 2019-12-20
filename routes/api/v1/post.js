const express = require('express');
const { body } = require('express-validator');

const postController = require("../../../controller/api/v1/post");
const commentController = require("../../../controller/api/v1/comment");
const uploadController = require("../../../controller/api/v1/upload");
const isAuth = require("../../../auth/is-auth-api");

const router = express.Router();

router.get("/getPosts", isAuth, postController.getPosts);
router.post(
    "/createPost",
    isAuth,
    uploadController.multipleUpload,
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
router.post("/post/:postId/comment", isAuth, commentController.postComment);
router.put("/comment/:commentId", isAuth, commentController.putComment);
router.delete("/comment/:commentId", isAuth, commentController.deleteComment);

module.exports = router;