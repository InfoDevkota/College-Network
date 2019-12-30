const Project = require("../../../model/project");
const User = require("../../../model/user");

module.exports.createProject = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const link = req.body.link;
    const semester = req.body.semester;

    const project = new Project({
        title: title,
        description: description,
        link: link,
        projectBy: req.userId
        //semester: semester //Need Semester Id
    })
    project.save()
    .then(project =>{
        User.findById(req.userId)
        .then(user =>{
            user.projects.push(project)
            user.save();
            return project;
        }).then(project =>{
            res.status(201).json({
                message: 'Project created successfully!',
                project: project
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

module.exports.getProjects = (req,res,next) =>{
    Project.find()
    .populate('projectBy')
    .then(projects=>{
        res.status(201).json({
            message: 'All Projects',
            projects: projects
        });
    })
    .catch(error => {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}

module.exports.getProjectById = (req,res,next) =>{
    const userId = req.params.userId;

    Project.find({
        projectBy: userId
    })
    .populate('projectBy')
    .then(projects =>{
        res.status(201).json({
            message: 'All Projects By the user',
            projects: projects
        });
    })
}