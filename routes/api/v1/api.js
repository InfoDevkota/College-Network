const express = require('express');

const authRoutes = require('../v1/auth');
const postRoutes = require('../v1/post');
const profileRoutes = require('../v1/profile');

const router = express.Router();

router.get("/",(req,res,next)=>{
    res.write("Hello");
    //res.status(422).json({message: 'Done'});
    res.end();
});

router.use(authRoutes);
router.use(postRoutes);
router.use(profileRoutes);

router.use((error, req,res,next)=>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

router.use((req,res,next)=>{
    res.status(404).json({ message: "404 not Found." });
    // res.write("404 Error");
    // res.end();
});

module.exports = router;