const express = require("express");

const noteController = require("../../../controller/api/v1/note");
const isAuth = require("../../../auth/is-auth-api");

const router = express.Router();

//here
router.get("/notes", isAuth, noteController.getNotes);
router.post("createNote", isAuth, noteController.postCreateNote);
router.get("/note/:noteId", isAuth, noteController.getNote);

module.exports = router;