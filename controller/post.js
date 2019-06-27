const Post = require("../model/post");
const Student = require('../model/student');

exports.postCreatePost = (req,res,next) =>{
    let date = new Date();
    
    const content = req.body.content;
    const post = new Post({
        content: content,
        postedBy: req.session.student,
        date: date
    })
    return post.save()
    .then(result =>{
        Student.findById(req.session.student._id)
        .then(student =>{
            student.posts.push(result)
            student.save();
        })
        .catch(error =>{
            console.log(error);
        })
        res.redirect('/');
    })
    .catch(error => console.log(error));
}