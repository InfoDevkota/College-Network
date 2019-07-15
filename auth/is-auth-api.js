const jwt = require('jsonwebtoken');
const User = require("../model/user");

module.exports = (req,res,next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'ThisIsASecretKeyAndKey');
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }
    if(!decodedToken){
        const error = new Error('Not authenticated');
        console.log("Not auth");
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    User.findById(decodedToken.userId)
    .then(user =>{
        if(user){
            req.user = user
            next();
        } else {
            const error = new Error('Not authenticated');
            error.statusCode = 401;
            next(error);
        }
    }).catch(error =>{
        next(error);
    })
}