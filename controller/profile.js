const Student = require('../model/student');


exports.getProfile = (req,res,next) => {
    let isAuth = false;
    if(req.session.isLoggedIn) {
        isAuth = true;
    }

    const userName = req.params.username;

    let query = {userName: userName}
    Student.findOne(query)
    .populate('posts', 'date content')
    .then(student =>{
        if(student){
            res.render("profile",{
                isAuth:isAuth,
                user: student,
                showEdit: false,
                edit: false
            })
        } else {
            next();
        }
    })
    .catch(error => console.log(error));
}

exports.getMe = (req,res,next) =>{
    Student.findById(req.session.student._id)
    .populate('posts', 'date content')
    .then(user =>{
        res.render("profile",{
            isAuth: true,
            user: user,
            showEdit: true,
            edit: false
        })
    });
}

exports.postMe = (req,res,next) =>{
    const name = req.body.name;
    const email = req.body.email;
    const userName = req.body.userName;
    Student.findById(req.session.student._id)
    .then(student =>{
        student.name = name;
        student.email = email;
        student.userName = userName;

        req.session.student = student;
        return student.save();
    })
    .then(result =>{
        res.redirect('/');
    })
    .catch(error => console.log(error));

}

exports.getMeEdit = (req,res,next) =>{
    const user = req.session.student;
    res.render("profile",{
        user: user,
        showEdit: false,
        edit: true
    })
}