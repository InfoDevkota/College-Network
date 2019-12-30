const express = require('express');

const projectController = require("../../../controller/api/v1/project");
const isAuth = require("../../../auth/is-auth-api");

const router = express.Router();

router.post("/project/create", isAuth, projectController.createProject);
router.get("/projectBy/:userId", isAuth, projectController.getProjectById);
router.get("project/all", isAuth, projectController.getProjects);

module.exports = router;