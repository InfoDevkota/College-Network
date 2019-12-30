const express = require('express');

const profileController = require("../../../controller/api/v1/profile");
const isAuth = require("../../../auth/is-auth-api");
const uploadController = require("../../../controller/api/v1/upload");

const router = express.Router();

router.get("/me",isAuth,profileController.getMe);
router.get("/addInfo",isAuth,profileController.getProfileUpdate);//Call when user login to fill details
router.put("/me",isAuth,profileController.putMe);
router.get("/profile/:username",isAuth,profileController.getProfile);
router.get("/profileById/:userId",isAuth,profileController.getProfileById);
router.put("/profilePic",
    isAuth,
    uploadController.multipleUpload,
    profileController.putProfilePic
);
router.get("/users/:name",isAuth,profileController.getUserByName);

module.exports = router;