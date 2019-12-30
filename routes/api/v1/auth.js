const express = require('express');
const { body } = require('express-validator');

const authController = require("../../../controller/api/v1/auth");
const uploadController = require("../../../controller/api/v1/upload");

const router = express.Router();

router.post(
    '/signup',
    uploadController.multipleUpload,
    [
        body('email')
            .isEmail()
            .withMessage('Invalid Email')
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({min:8})
            .withMessage("Password should be more than 8 Characters."),
        body('name')
            .trim()
            .not()
            .isEmpty()
    ],
    authController.postSignup);

router.post(
    '/login',
    [
        body('email')
            .isEmail()
            .withMessage('Invalid Email')
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({min:8})
    ],
    authController.postLogin);

module.exports = router;