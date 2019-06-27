const express = require('express');

const profileController = require("../../../controller/api/v1/profile");
const isAuth = require("../../../auth/is-auth-api");

const router = express.Router();

router.get("/me",isAuth,profileController.getMe);
router.put("/me",isAuth,profileController.putMe);
router.get("/profile/:username",isAuth,profileController.getProfile);
router.get("/profileById/:userId",isAuth,profileController.getProfileById);

module.exports = router;