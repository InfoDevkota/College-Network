const express = require('express');
const { body } = require('express-validator');

const Student = require('../../../model/student');
const authController = require("../../../controller/api/v1/auth");

const router = express.Router();

router.post(
    '/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Invalid Email')
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({min:8}),
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
            .withMessage('Invalid Email'),
        body('password')
            .trim()
            .isLength({min:8})
    ],
    authController.postLogin);

module.exports = router;