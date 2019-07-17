const Post = require("../../../model/post");
const Comment = require("../../../model/comment");
const User = require("../../../model/user");

exports.postComment = (req,res,next) =>{
    let postId = req.params.postId;
    const comment = req.body.comment;
    const newComment = Comment({
        comment: comment,
        commentBy: req.userId,
        commentOn: postId
    })
    return newComment.save()
    .then(comment =>{
        User.findById(req.userId)
        .then(user =>{
            user.comments.push(comment);
            user.save();
        })
        Post.findById(postId)
        .populate({
            path: 'comments',
            populate: {path: 'commentBy', select: 'name _id'}//multiple level population
        })
        .then(post=>{
            post.totalComments++;
            post.comments.push(comment);
            post.save();
            res.status(201).json({
                message: 'Comment Successfully Posted!',
                newComment: comment,
                post: post
            });
        })
    })
}

exports.putComment = (req,res,next) =>{
    let commentId = req.params.commentId;
    const comment = req.body.comment;
    Comment.findById(commentId)
    .then(thisComment =>{
        thisComment.comment = comment;
        thisComment.edited = true;
        return thisComment.save();
    })
    .then(comment =>{
        res.status(201).json({
            message: 'Comment Successfully Updated!',
            comment: comment
        });
    })
}

exports.deleteComment = (req,res,next) =>{
    let commentId = req.params.commentId;
    Comment.findByIdAndRemove(commentId)
    .then(thisComment =>{
        res.status(201).json({
            message: 'Comment Successfully Deleted!'
        });
    })
}