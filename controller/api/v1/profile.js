const Student = require('../../../model/student');


exports.getProfile = (req,res,next) => {
    const userName = req.params.username;

    let query = {userName: userName}
    Student.findOne(query)
    .select('-password')
    .populate('posts', 'date content')
    .then(student =>{
        if(student){
            res.status(201).json({
                message: 'profile fetch successfully!',
                student: student
            });
        }
    })
    .catch(error => {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}

exports.getProfileById = (req,res,next) => {
    const userId = req.params.userId;

    Student.findById(userId)
    .select('-password')
    .populate('posts', 'date content')
    .then(student =>{
        if(student){
            res.status(201).json({
                message: 'profile fetch successfully!',
                student: student
            });
        }
    })
    .catch(error => {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}

exports.getMe = (req,res,next) =>{
    Student.findById(req.studentId)
    .select('-password')
    .populate('posts', 'date content')
    .then(student =>{
        if(student){
            res.status(201).json({
                message: 'profile fetch successfully!',
                student: student
            });
        }
    })
    .catch(error => {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}

exports.putMe = (req,res,next) =>{
    const name = req.body.name;
    const email = req.body.email;
    const userName = req.body.userName;
    Student.findById(req.studentId)
    .select('-posts -password')
    .then(student =>{
        student.name = name;
        student.email = email;
        student.userName = userName;

        req.student = student;
        return student.save();
    })
    .then(result =>{
        res.status(201).json({
            message: 'profile updated successfully!',
            student: result
        });
    })
    .catch(error => {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });

}