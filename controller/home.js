const Student = require('../model/student');
const Post = require('../model/post');

exports.getHome = (req,res,next) =>{
    console.log("Home Controller");
    let isAuth = false;
    let name;
    if(!req.session.isLoggedIn) {
        console.log("Not logged in");
    } else {
        console.log("Logged in");
        isAuth = true;
        name = req.student.name;
    }

    let posts;
    if(isAuth){
        Post.find()
        .sort({date:-1})
        .populate('postedBy', 'name userName')
        .then(allPosts =>{
            return allPosts;
        })
        .then(posts =>{
            res.render('home', {
                isAuth: isAuth,
                name: name,
                posts: posts
            })
        })
    } else {
        res.render('home', {
            isAuth: false
        })
    }

    
}