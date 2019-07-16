const express = require('express');

const messengerController = require("../../../controller/api/v1/messenger");
const isAuth = require("../../../auth/is-auth-api");

const router = express.Router();

router.get("/chat/:userId",isAuth,messengerController.getMessageHistory);
router.get("/chat/users",isAuth,messengerController.getChatedUser);


module.exports = router;