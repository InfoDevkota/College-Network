const Department = require('../model/department');
const Semester = require('../model/semester');
const Section = require('../model/section');
const UserType = require('../model/userType');

exports.getAdmin = (req,res,next) => {
    let departments;
    let semesters;
    let sections;
    let userTypes;

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
            message: false
        })
    })
}

exports.postDepartments = (req,res,next) =>{
    const name = req.body.name;
    const id = req.body.id;
    const hod = req.body.hod;

    if(name.length == 0){
        res.redirect("/admin");
        return;
    }

    const department = new Department({
        name:name,
        id:id,
        hod:hod
    });
    department.save().then(result =>{
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