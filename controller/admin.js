const bcrypt = require('bcryptjs');

const Department = require('../model/department');
const Semester = require('../model/semester');
const Section = require('../model/section');
const UserType = require('../model/userType');
const User = require('../model/user');

exports.getAdmin = (req,res,next) => {
    let departments;
    let semesters;
    let sections;
    let userTypes;
    let hods;

    //Here what I want is all these fetch from Database done syncournesly
    //once all done response back
    //cant achieve that 
    //Try to work through this patter and does not work
    //TODO fix if you have idea

    async function getOptions() {
        await Department.find()
        .then(allDepartments =>{
            departments = allDepartments;
        })
        await Semester.find()
        .then(allSemester =>{
            semesters = allSemester;
        })
        await Section.find()
        .then(allSection =>{
            sections = allSection;
        })
        await UserType.find()
        .then(allUserType =>{
            userTypes = allUserType;
        });
        await User.find({
            ishod: true
        })
        .then(allHods =>{
            hods = allHods;
        })
        return true;
    }

    getOptions()
    .then(bool =>{
        console.log("response");
        res.render('admin', {
            departments: departments,
            semesters: semesters,
            sections: sections,
            userTypes: userTypes,
            hods,
            message: false,
            error: null,
            info: null
        })
    })
}

exports.postDepartments = (req,res,next) =>{
    const name = req.body.name;
    const id = req.body.id;
    const hod = req.body.hod;

    if(name.length == 0){
        displayAdmin(res, null, "Please provide Department Name");
        return;
    }
    if(hod == null){
        displayAdmin(res, null, "Please Select HOD or craete one");
        return;
    }

    const department = new Department({
        name:name,
        id:id,
        hod:hod
        // ...(hod && {    //this three line will add hod if it is not null :)
        //     hod
        // })
    });
    department.save()
    .then(result =>{
        User.findById(hod)
        .then(thisHod =>{
            thisHod.department = result;
            thisHod.save();
        })
        res.redirect('/admin');
    })
}

exports.postSemester = (req,res,next) =>{
    const name = req.body.name;
    const number = req.body.number;

    if(name.length == 0){
        res.redirect("/admin");
        return;
    }

    const semester = new Semester({
        name:name,
        number:number
    });
    semester.save().then(result =>{
        res.redirect('/admin');
    })
}

exports.postSection = (req,res,next) =>{
    const name = req.body.name;
    const id = req.body.id;

    if(name.length == 0){
        res.redirect("/admin");
        return;
    }

    const section = new Section({
        name:name,
        id:id
    });
    section.save().then(result =>{
        res.redirect('/admin');
    })
}

exports.postUserType = (req,res,next) =>{
    const name = req.body.name;
    const id = req.body.id;

    if(name.length == 0){
        res.redirect("/admin");
        return;
    }

    const userType = new UserType({
        name:name,
        id:id
    });
    userType.save().then(result =>{
        res.redirect('/admin');
    })
}

exports.getDepartment = (req,res,next) =>{
    const departmentId = req.params.departmentId;
    Department.findById(departmentId)
    .populate("hod")
    .then(department =>{
        res.render("department", {
            department
        });
    })
}

exports.postAddHOD = (req,res,next) =>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, 12)
    .then(hashedPassword => {
        const user = new User({
            email: email,
            name: name,
            password: hashedPassword,
            ishod: true
        });
        return user.save();
    })
    .then(result=>{
        displayAdmin(res, "Hod Created", null);
    })
}

function displayAdmin(res, info, error){
    let departments;
    let semesters;
    let sections;
    let userTypes;
    let hods;

    //Here what I want is all these fetch from Database done syncournesly
    //once all done response back
    //cant achieve that 
    //Try to work through this patter and does not work
    //TODO fix if you have idea

    async function getOptions() {
        await Department.find()
        .then(allDepartments =>{
            departments = allDepartments;
        })
        await Semester.find()
        .then(allSemester =>{
            semesters = allSemester;
        })
        await Section.find()
        .then(allSection =>{
            sections = allSection;
        })
        await UserType.find()
        .then(allUserType =>{
            userTypes = allUserType;
        });
        await User.find({
            ishod: true
        })
        .then(allHods =>{
            hods = allHods;
        })
        return true;
    }

    getOptions()
    .then(bool =>{
        console.log("response");
        res.render('admin', {
            departments: departments,
            semesters: semesters,
            sections: sections,
            userTypes: userTypes,
            hods,
            message: false,
            info,
            error
        })
    })
}

module.exports.getUnverifiedStudents = (req,res,next) =>{
    User.find({
        isVerified: false,
        isStudent: true
    })
    .then(students =>{
        res.render('verifyStudents', {
            students,
            error: "",
            info: ""
        })
    })
}

module.exports.verifyStudent = (req,res,next) =>{
    let studentId = req.params.studentId;
    User.findById(studentId)
    .then(user =>{
        user.isVerified = true;
        user
        .save()
        .then(user => {
            User.find({
                isVerified: false,
                isStudent: true
            })
            .then(students =>{
                res.render('verifyStudents', {
                    students,
                    error: "",
                    info: "A User Verified."
                })
            })
        })
    })
}