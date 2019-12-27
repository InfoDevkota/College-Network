const Post = require("../../../model/post");
const Comment = require("../../../model/comment");
const User = require("../../../model/user");
const Note = require("../../../model/note");

exports.getSearch = async (req,res,next) =>{
    const term = req.query.term; //  host/search?term=sagar
    // const user = req.query.user;
    // const post = req.query.post;
    // const comment = req.query.comment;
    // const note = req.query.note;

    // const noteById = req.query.noteById;
    // const postById = req.query.postById;
    // const commentById = req.query.commentById;

    let response ={};
   
    await User.find({name:{
        $regex: new RegExp(term, "ig")
    }})
    .select('-password, -posts, -messageBoxUser')
    .then(users =>{
        response.users = users;
        
    })

    await Post.find({content:{
        $regex: new RegExp(term, "ig")
    }})
    .select('')
    .then(posts =>{
        response.posts = posts;
        
    })

    await Note.find({title:{
        $regex: new RegExp(term, "ig")
    }})
    .select('')
    .then(notes =>{
        response.notes = notes;
        
    })

    res.status(201).json({
        message: 'all results',
        results: response
    });
}


// http://www.google.com/hi/there?qs1=you&qs2=tube

// req.query
// {
//   qs1: 'you',
//   qs2: 'tube'
// }

// req.params
// {
//   param1: 'there'
// }

exports.getSearchByNote = (req,res,next) =>{
    const term = req.query.term; // host/search/note?term=sagar
    const notePostedById = req.query.notePostedById;
    const noteById = req.query.noteById;

    query = {};
    if(notePostedById){
        query.uploadedby = notePostedById;
    }
    if(noteById){
        query.noteBy = noteById;
    }
    query.title = {
        $regex: new RegExp(term, "ig")
    }

    Note.find(query)
    .then(notes =>{
        res.status(201).json({
            message: 'all notes',
            notes: notes
        });
    })
}

exports.getSearchByPost = (req,res,next) =>{
    const term = req.query.term; // host/search/note?term=sagar
    const postedById = req.query.postedById;

    console.log(term);
    console.log(postedById);

    query = {};
    if(postedById){
        query.postedBy = postedById;
    }
    query.content = {
        $regex: new RegExp(term, "ig")
    }

    Post.find(query)
    .then(posts =>{
        res.status(201).json({
            message: 'all Posts',
            posts: posts
        });
    })
}




// or case
// Movie.find({
//     $or: [
//         {title: title},
//         {main_actor: main_actor}
//         // ...
//     ]
// });