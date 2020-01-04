const express = require('express');
const uploadController = require("../../../controller/api/v1/upload");

const departmentController = require('../../../controller/api/v1/department');
const isAuth = require("../../../auth/is-auth-api");

const router = express.Router();

router.get("/department/:departmentId", isAuth, departmentController.getDepartmentById)
router.put("/department/:departmentId", isAuth, departmentController.getDepartmentById)
router.get("/departments", isAuth, departmentController.getDepartments);
router.post("/department/:departmentId/createPost", isAuth, uploadController.multipleUpload, departmentController.postCreatePost);
router.put("/department/:departmentId/post/:postId", isAuth, departmentController.postCreatePost);
router.delete("/department/:departmentId/post/:postId", isAuth, departmentController.postCreatePost);

router.get("/department/students/:departmentId", isAuth, departmentController.getStudentsBySemesterAndSectionByDepartment);
router.get("/department/teachers/:departmentId", isAuth, departmentController.getTeachersBySemesterAndSectionByDepartment);

router.get("/department/semestersAndSections", isAuth, departmentController.getSectionsAndSemesters);
router.post("/department/:departmentId", isAuth, departmentController.postSendSMS); //department/{depId}?semesterId={id}?sectionId={id}

module.exports = router;