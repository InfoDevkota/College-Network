const express = require("express");

const noteController = require("../../../controller/api/v1/note");
const isAuth = require("../../../auth/is-auth-api");
const uploadController = require("../../../controller/api/v1/upload");

const router = express.Router();
    
//here
router.get("/notes", isAuth, noteController.getNotes);
router.post("/createNote", isAuth, uploadController.multipleUpload, noteController.noteCreateNote);
router.get("/note/:noteId", isAuth, noteController.getNote);
router.delete("/note/:noteId", isAuth, noteController.deleteNote);

module.exports = router;