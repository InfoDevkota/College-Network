const User = require('../../../model/user');
const Department = require('../../../model/department');
const Semester = require('../../../model/semester');
const Section = require('../../../model/section');
const UserType = require('../../../model/userType');


exports.getProfile = (req,res,next) => {
    const userName = req.params.username;

    let query = {userName: userName}
    User.findOne(query)
    .select('-password')
    .populate('posts', 'date content')
    .then(user =>{
        if(user){
            res.status(201).json({
                message: 'profile fetch successfully!',
                user: user
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

    User.findById(userId)
    .select('-password')
    .populate('posts', 'date content')
    .then(user =>{
        if(user){
            res.status(201).json({
                message: 'profile fetch successfully!',
                user: user
            });
        }else {
            res.status(404).json({
                message: 'profile not found',
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
    User.findById(req.userId)
    .select('-password')
    .populate('posts', 'date content')
    .then(user =>{
        if(user){
            res.status(201).json({
                message: 'profile fetch successfully!',
                user: user
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

exports.getProfileUpdate = (req,res,next) =>{
    let departments;
    let semesters;
    let sections;
    let userTypes;

    async function getOptions() {
        Department.find()
        .then(allDepartments =>{
            departments = allDepartments;
        })
        Semester.find()
        .then(allSemester =>{
            semesters = allSemester;
        })
        Section.find()
        .then(allSection =>{
            sections = allSection;
        })
        UserType.find()
        .then(allUserType =>{
            userTypes = allUserType;
        })
        return true;
    }
    getOptions()
    .then(bool =>{
        console.log("response");
        User.findById(req.userId)
        .select('-password -posts')
        .then(user =>{
            if(user){
                res.status(201).json({
                    message: 'Success',
                    user: user,
                    departments: departments,
                    semesters: semesters,
                    sections: sections,
                    userTypes: userTypes
                });
            }
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        });
    }).catch(error =>{
        console.log(error);
    })
    
}

exports.putMe = (req,res,next) =>{
    const name = req.body.name;
    const email = req.body.email;
    const userName = req.body.userName;
    User.findById(req.userId)
    .select('-posts -password')
    .then(user =>{
        user.name = name;
        user.email = email;
        user.userName = userName;

        req.user = user;
        return user.save();
    })
    .then(result =>{
        res.status(201).json({
            message: 'profile updated successfully!',
            user: result
        });
    })
    .catch(error => {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });

}

exports.putProfilePic = (req,res,next) =>{
    let imageLink = "";
    if(req.file){
        imageLink = req.file.path;
    }
    User.findById(req.userId)
    .select('-posts -password')
    .then(user =>{
        user.profileImage = imageLink;

        req.user = user;
        return user.save();
    })
    .then(result =>{
        res.status(201).json({
            message: 'profile pic updated successfully!',
            user: result
        });
    })
    .catch(error => {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });

}