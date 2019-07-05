const express = require('express');

const v1Routes = require('../api/v1/api');

const router = express.Router();

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, DELETE'
    );
    res.setHeader('Access-Controll-Allow-Headers', 'Content-Type, Authorization');
    next();
});

router.use("/v1", v1Routes);
//router.use("/v2", v2Routes);//Just to answer why this api.js?

module.exports = router;