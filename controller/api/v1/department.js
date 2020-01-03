const Department = require('../../../model/department');
const Post = require('../../../model/post');
const User = require('../../../model/user') //TODO DONE send all users related to this department

exports.getDepartmentById = (req,res,next) =>{
    const depId = req.params.departmentId;
    Department.findById(depId)
    .populate("hod")
    .then(department =>{
        if(department){
            User.find({
                department: depId
            })
            .then(depMambers =>{
                res.status(200).json({
                    message: 'Department fetch successfully!',
                    department, //ie department: department
                    members: depMambers
                });
            })
        }else {
            res.status(404).json({
                message: 'Department not found',
            });
        }
    })
}

exports.getDepartments = (req,res,next) =>{
    Department.find()
    .populate("hod")
    .then(departments =>{
        res.status(200).json({
            message: 'Departments Fetched',
            departments
        })
    })
}

exports.postCreatePost = (req,res,next) =>{
    let date = new Date();    
    const content = req.body.content;

    const departmentId = req.params.departmentId;
    Department.findById(departmentId)
    .then(department =>{
        if(department.hod == req.userId){
            let postedFor = {
                isDepartment: true,
                department: departmentId
            }
            const post = new Post({
                content: content,
                postedBy: req.userId,
                date: date,
                postedFor: postedFor
            })
            return post.save()
            .then(post =>{
                department.posts.push(post);
                department.save()
                return res.status(201).json({
                    message: 'Post successfully Created',
                    post:post
                })
                    
            })
        } else {
            res.status(400).json({
                message: 'Your are not allowed to create Post in this Department'
            })
        }
    })
}

exports.putPost = (req,res,next) =>{
    const departmentId = req.params.departmentId;
    const postId = req.params.postId;
    const content = req.body.content;
    Department.findById(departmentId)
    .then(department =>{
        if(department.hod == req.userId){
            Post.findById(postId)
            .then(post =>{
                post.content = content;
                post.save();
            })
            .then(post =>{
                res.status(200).json({
                    message: 'Post Edited Successfully.',
                    post:post
                })
            })
        } else {
            res.status(400).json({
                message: 'Your are not allowed to Edit this Post'
            })
        }
    })
}

exports.deletePost = (req,res,next) =>{
    const departmentId = req.params.departmentId;
    const postId = req.params.postId
    Department.findById(departmentId)
    .then(department =>{
        if(department.hod == req.userId){
            Post.findByIdAndDelete(postId)
            .then(bool =>{
                res.status(202).json({
                    message: 'Post successfully deleted.'
                });
            })
        } else {
            res.status(400).json({
                message: 'Your are not allowed to Delete this Post'
            })
        }
    })
}

exports.putDepartment = (req,res,next) =>{
    const departmentId = req.params.departmentId;
    const intro = req.body.intro;
    const name = req.body.name;
    Department.findById(departmentId)
    .then(department =>{
        department.intro = intro;
        department.name = name;
        if(req.file){
            department.photo = req.file.path;
        }
        department.save()
        .then(department=>{
            res.status(200).json({
                message: 'Department Successfully Editted.',
                department:department
            })
        })
    })
}

module.exports.getStudentsBySemesterAndSectionByDepartment = (req,res,next) =>{
    const departmentId = req.params.departmentId; // host/departmentId
    const semesterId = req.query.semesterId; // host/departmentId?semesterId=6
    const sectionId = req.query.sectionId;

    query = {};
    if(semesterId){
        query.semester = semesterId;
    }
    if(sectionId){
        query.section = sectionId;
    }
    query.isStudent = true;
    query.department = departmentId;

    Department.findById(departmentId)
    .then(department =>{
        if(department.hod == req.userId){
            User.find(query)
            .then(users =>{
                res.status(200).json({
                    message: 'All Students',
                    students:users
                })
            })
        } else {
            res.status(451).json({
                message: 'Not Allowed'
            })
        }
    });
}


module.exports.getTeachersBySemesterAndSectionByDepartment = (req,res,next) =>{
    const departmentId = req.params.departmentId; // host/departmentId
    const semesterId = req.query.semesterId; // host/departmentId?semesterId=6
    const sectionId = req.query.sectionId;

    query = {};
    if(semesterId){
        query.semester = semesterId;
    }
    if(sectionId){
        query.section = sectionId;
    }
    query.isTeacher = true;
    query.department = departmentId;

    Department.findById(departmentId)
    .then(department =>{
        if(department.hod == req.userId){
            User.find(query)
            .then(users =>{
                res.status(200).json({
                    message: 'All Teachers',
                    teachers:users
                })
            })
        } else {
            res.status(451).json({
                message: 'Not Allowed'
            })
        }
    });
}