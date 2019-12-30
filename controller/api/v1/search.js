const Post = require("../../../model/post");
const Comment = require("../../../model/comment");
const User = require("../../../model/user");
const Note = require("../../../model/note");

exports.getSearch = async (req,res,next) =>{
    const term = req.query.term;

    let response ={};
   
    await User.find({name:{
        $regex: new RegExp(term, "ig")
    }})
    .select('-password -posts -messageBoxUser')
    .populate('department', 'name _id')
    .then(users =>{
        response.users = users;
        
    })

    await Post.find(
        {
            content:{
                $regex: new RegExp(term, "ig"),
            },
            $or:[ //Note Tested should work
                {visibilityPublic: true},
                {department: req.departmentId}
            ]
        }
    )
    .select('')
    .populate('postedBy', 'name _id profileImage')
    .then(posts =>{
        response.posts = posts;
        
    })

    await Note.find({title:{
        $regex: new RegExp(term, "ig")
    }})
    .select('')
    .populate('uploadedby', 'name _id profileImage')
    .then(notes =>{
        response.notes = notes;
        
    })

    res.status(201).json({
        message: 'all results',
        results: response
    });
}


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
    .populate('uploadedby', 'name _id profileImage')
    //.populate('noteBy', 'name _id profileImage')
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
    query.$or = [ //Note Tested should work
        {visibilityPublic: true},
        {department: req.departmentId}
    ]

    Post.find(query)
    .populate('postedBy', 'name _id profileImage')
    .then(posts =>{
        res.status(201).json({
            message: 'all Posts',
            posts: posts
        });
    })
}

exports.getUserByDepartment = (req,res,next) =>{
    const term = req.query.term; // host/search/note?term=sagar
    const depId = req.query.depId;

    User.find({
        department: depId,
        name:{
            $regex: new RegExp(term, "ig")
        }
    })
    .select('-password -posts -messageBoxUser')
    .populate('department', 'name _id')
    .then(users =>{
        res.status(201).json({
            message: 'This department Students',
            users: users
        });
        
    })
}

exports.getUser = (req,res,next) =>{
    const term = req.query.term;

    User.find({
        name:{
            $regex: new RegExp(term, "ig")
        }
    })
    .select('-password -posts -messageBoxUser')
    .populate('department', 'name _id')
    .then(users =>{
        res.status(201).json({
            message: 'All users',
            users: users
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