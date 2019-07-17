const express = require('express');

const departmentController = require('../../../controller/api/v1/department');
const isAuth = require("../../../auth/is-auth-api");

const router = express.Router();

router.get("/department/:departmentId", isAuth, departmentController.getDepartmentById)
router.put("/department/:departmentId", isAuth, departmentController.getDepartmentById)
router.get("/departments", isAuth, departmentController.getDepartments);
router.post("/department/:departmentId/createPost", isAuth, departmentController.postCreatePost);
router.put("/department/:departmentId/post/:postId", isAuth, departmentController.postCreatePost);
router.delete("/department/:departmentId/post/:postId", isAuth, departmentController.postCreatePost);

module.exports = router;