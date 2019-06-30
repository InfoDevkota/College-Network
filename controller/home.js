const Student = require('../model/student');
const Post = require('../model/post');

exports.getHome = (req,res,next) =>{
    console.log("Home Controller");
    let isAuth = false;
    if(req.session.isLoggedIn) {
        isAuth = true;
    }

    res.render('home', {
        isAuth: isAuth
    })
}