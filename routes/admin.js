const express = require('express');
const isAuth = require("../auth/is-auth");

const adminController = require('../controller/admin')

const router = express.Router();

router.get('/department/:departmentId', isAuth, adminController.getDepartment);

//router.get("/admin",isAuth,adminController.getAdmin);//TODO
router.get('/', isAuth, adminController.getAdmin);//TODO
router.post('/department', isAuth, adminController.postDepartments);
router.post('/semester', isAuth, adminController.postSemester);
router.post('/section', isAuth, adminController.postSection);
router.post('/userType', isAuth, adminController.postUserType);
router.post('/addHOD', isAuth, adminController.postAddHOD);


module.exports = router;