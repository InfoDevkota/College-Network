const express = require('express');

const searchController = require("../../../controller/api/v1/search");
const isAuth = require("../../../auth/is-auth-api");

const router = express.Router();

router.get("/search/note", searchController.getSearchByNote);
router.get("/search/post", searchController.getSearchByPost);
router.get("/search/userByDep", searchController.getUserByDepartment);
router.get("/search/user", searchController.getUser);
router.get("/search", searchController.getSearch);


module.exports = router;