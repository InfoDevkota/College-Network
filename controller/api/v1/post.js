const fs = require('fs');
const path = require('path');

const Post = require("../../../model/post");
const User = require('../../../model/user');
const { validationResult } = require('express-validator');

exports.postCreatePost = (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    let date = new Date();
    
    const content = req.body.content;
    const post = new Post({
        content: content,
        postedBy: req.userId,
        date: date
    })
    if(req.files){
        post.imageUrl = req.files.map(file => file.path);
    }
    return post.save()
    .then(post =>{
        User.findById(req.userId)
        .then(user =>{
            user.posts.push(post)
            return user.save();
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
    let totalPosts;
    
    Post.find()
    .countDocuments()
    .then(postNumbers => {
        totalPosts = postNumbers;
        return true;
    })
    .then(bool =>{
        Post.find()
        .sort({date:-1})
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        .populate('postedBy', 'name _id profileImage')
        .populate({
            path: 'comments',
            populate: {path: 'commentBy', select: 'name _id'}//multiple level population
        })//Here we populate comments first then commentBy(user) with in that comment
        .then(allPosts =>{
            allPosts.forEach(element => {
                element.liked=false;
                element.likes.forEach(user =>{
                    if(user == req.userId){
                        element.liked = true;
                    }
                })
            });
            return allPosts;
        })
        .then(posts =>{
            res.status(200).json({
                message: 'Fetched posts successfully.',
                posts: posts,
                totalPosts: totalPosts
            });
        }).catch(error =>{
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        })
    })
}

exports.getPost = (req,res,next) =>{
    let postId = req.params.postId;
    Post.findById(postId)
    .populate('postedBy', 'name _id profileImage')
    .populate({
        path: 'comments',
        populate: {path: 'commentBy', select: 'name _id'}
    })
    .then(post =>{
        post.liked=false;
        post.likes.forEach(user =>{
            if(user == req.userId){
                post.liked = true;
            }
        })
        return post;
    })
    .then(post=>{
        res.status(200).json({
            message: 'post fetched successfully.',
            post: post
        });
    })
}

exports.putPost = (req,res,next) =>{
    const content = req.body.content;
    let postId = req.params.postId;
    Post.findById(postId)
    .populate('postedBy', 'name _id')
    .populate({
        path: 'comments',
        populate: {path: 'commentBy', select: 'name _id'}
    })
    .then(post =>{
        post.liked=false;
        post.likes.forEach(user =>{
            if(user == req.userId){
                post.liked = true;
            }
        })
        return post;
    })
    .then(post=>{
        if(post.postedBy != req.userId){
            res.status(405).json({
                message: 'You have no permission to edit this post.'
            });
        } else {
            post.content = content;
            post.save();
            res.status(201).json({
                message: 'post successfully editted.',
                post: post
            });
        }
    })
}

exports.putLike = (req,res,next) =>{
    let postId = req.params.postId;
    Post.findById(postId)
    .then(post =>{
        let liked = false; 
        post.likes.forEach(user =>{
            if(user = req.userId){
                liked = true;
            }
        })
        if(!liked){
            likes = post.totalLike + 1;
            post.likes.push(req.userId);
            post.totalLike = likes;
            post.save();
            res.status(201).json({
                message: 'post successfully liked.',
                post: post
            });
        } else {
            res.status(405).json({
                message: 'Already liked.',
                post: post
            });
        }
    }).catch(error =>{
        console.log(error);
        next(error);
    })
}

exports.putUnLike = (req,res,next) =>{
    let postId = req.params.postId;
    Post.findById(postId)
    .then(post =>{
        let yes = false; 
        post.likes.forEach(user =>{
            if(user = req.userId){
                yes = true;
            }
        })
        if(yes){
            likes = post.totalLike - 1;
            post.likes.pop(req.userId);
            post.totalLike = likes;
            post.save();
            res.status(201).json({
                message: 'post successfully Unliked.',
                post: post
            });
        } else {
            res.status(405).json({
                message: 'cannot Unliked.',
                post: post
            });
        }
    })
}

exports.deletePost = (req,res,next) =>{
    let postId = req.params.postId;
    let imageURL;
    Post.findById(postId)
    .then(post=>{
        imageURL = post.imageUrl;
        if(post.postedBy != req.userId){
            res.status(405).json({
                message: 'You have no permission to delete this post.'
            });
        } else {
            clearImage(imageURL);
            Post.findByIdAndDelete(postId)
            .then(bool =>{
                res.status(202).json({
                    message: 'post successfully deleted.'
                });
            })
        }
    })
}

const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
  };