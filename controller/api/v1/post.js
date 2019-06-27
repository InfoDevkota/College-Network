const Post = require("../../../model/post");
const Student = require('../../../model/student');
const { validationResult } = require('express-validator');

exports.postCreatePost = (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    let date = new Date();
    
    const content = req.body.content;
    const post = new Post({
        content: content,
        postedBy: req.studentId,
        date: date
    })
    return post.save()
    .then(post =>{
        Student.findById(req.studentId)
        .then(student =>{
            student.posts.push(post)
            return student.save();
        })
        .then(postCreator =>{
            res.status(201).json({
                message: 'Post created successfully!',
                post: post
              });
        })
    })
    .catch(error => {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}

exports.getPosts = (req,res,next) =>{
    const currentPage = parseInt(req.query.page) || 1;
    const perPage =  parseInt(req.query.size) || 10;
    
    Post.find()
    .sort({date:-1})
    .skip((currentPage - 1) * perPage)
    .limit(perPage)
    .populate('postedBy', 'name _id')
    .then(allPosts =>{
        return allPosts;
    })
    .then(posts =>{
        res.status(200).json({
            message: 'Fetched posts successfully.',
            posts: posts
          });
    }).catch(error =>{
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    })
}