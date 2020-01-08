const sparrow = require('sms-sparrow');
require('dotenv/config');

let token = process.env.SPARROW_TOKEN
let identity = process.env.SPARROW_IDENTITY
sparrow.init(token,identity);
//All above for sms;

const Department = require('../../../model/department');
const Post = require('../../../model/post');
const User = require('../../../model/user') //TODO DONE send all users related to this department
const Section = require('../../../model/section');
const Semester = require('../../../model/semester');
const SMS = require('../../../model/sms');

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
            if(req.files){
                post.imageUrl = req.files.map(file => file.path);
            }
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
// const Nexmo = require('nexmo');

// const nexmo = new Nexmo({
//   apiKey: process.env.NEXMO_API_KEY,
//   apiSecret: process.env.NEXMO_API_SECRET
// }, {debug: true});


module.exports.postSendSMS = async (req,res,next) => {
    // try {
    //     nexmo.message.sendSms('Nexmo', req.body.data.toNumber, req.body.data.message,{
    //         type: "unicode"
    //       }, (err, responseData) => {
    //         if (err) {
    //           console.log(err);
    //         } else {
    //           if (responseData.messages[0]['status'] === "0") {
    //             res.status(200).json({
    //                 message: "Message sent successfully."
    //             })
    //           } else {
    //             res.status(401).json({
    //                 message: `Message failed with error: ${responseData.messages[0]['error-text']}`
    //             })
    //           }
    //         }
    //       });
    //   } catch (err) {
    //     next(err)
    //   }
    
    const departmentId = req.params.departmentId; // host/departmentId
    const semesterId = req.query.semesterId; // host/departmentId?semesterId=6
    const sectionId = req.query.sectionId;
    const smsMessage = req.body.data.message;
    console.log(req.body);
    console.log(req.body.data.message);
    console.log(smsMessage);

    let numbers = "";

    Department.findById(departmentId)
    .then(department =>{
        if(department.hod == req.userId){
            const sms = new SMS({
                message: smsMessage,
                sendBy: req.userId,
                semester: semesterId,
                section: sectionId,
                department: departmentId
            })
            sms.save();
            User.find({
                department: departmentId,
                semester: semesterId,
                section: sectionId
            })
            .then(users =>{
                // console.log("############# this dep selected students")
                // console.log(users);
                users.forEach(user => {
                    numbers = numbers + user.phone + ",";
                });
                // for(let i = 0; i < users.length; i++){
                //     if(i != length-1){
                //         numbers = numbers + users[i].phone + ", ";
                //     } else {
                //         numbers = numbers + users[i].phone;
                //     }
                // }
                numbers = numbers.replace(/,([^,]*)$/, "" + '$1');
               //numbers = "9814105801";

                console.log("###############");
                console.log("Message: - '" + smsMessage + "'");
                console.log("Will be send to::- '" + numbers + "'");
                console.log("##################");


                sendSMSSPARROW(req,res,next, smsMessage, numbers)

            }).catch(error => {
                console.log(error);
                error.message= "Error on Sending sms to users"
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                next(error);
            })
        } else {
            res.status(403).json({
                message: 'Not Allowed'
            })
        }
    });
}

module.exports.getSectionsAndSemesters = (req,res,next) =>{
    let sections;
    let semesters;
    Semester.find()
    .then(allSems =>{
        semesters = allSems;
        Section.find()
        .then(allSec =>{
            sections = allSec;
            
            res.status(200).json({
                message: "All sections and Semesters",
                sections : sections,
                semesters : semesters
            })
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        });
    })
    .catch(error => {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}

module.exports.getDepartmentPosts = (req,res,next) =>{
    const departmentId = req.params.departmentId;
    const currentPage = parseInt(req.query.page) || 1;
    const perPage =  parseInt(req.query.size) || 10;
    let totalPosts;
    //console.log("On Post Controller get Posts Dep id" + req.departmentId);
    // postedFor = {
    //     isDepartment: true,
    //     department: departmentId
    // }
    Post.find({
        'postedFor.isDepartment': true,
        'postedFor.department': departmentId
    })
    // .or([{ visibilityPublic: true }, { department: req.departmentId }])
    .countDocuments()
    .then(postNumbers => {
        totalPosts = postNumbers;
        return true;
    })
    .then(bool =>{
        Post.find({
            'postedFor.isDepartment': true,
            'postedFor.department': departmentId
        })
        .sort({created_at:-1})
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        .populate('postedBy', 'name _id profileImage')
        .populate({
            path: 'comments',
            populate: {path: 'commentBy', select: 'name _id'}//multiple level population
        })//Here we populate comments first then commentBy(user) with in that comment
        .then(allPosts =>{
            allPosts.forEach(element => {
                element.liked=false;
                element.likes.forEach(user =>{
                    if(user == req.userId){
                        element.liked = true;
                    }
                })
            });
            return allPosts;
        })
        .then(posts =>{
            res.status(200).json({
                message: 'Fetched posts successfully.',
                posts: posts,
                totalPosts: totalPosts
            });
        }).catch(error =>{
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        })
    })
}

module.exports.getSMS = (req,res,next) =>{
    const departmentId = req.params.departmentId;
    Department.findById(departmentId)
    .then(department =>{
        if(department.hod == req.userId){
            SMS.find({
                department: departmentId
            })
            .populate('department semester section sendBy')
            .then(smss => {
                res.status(200).json({
                    message: 'All SMS Send.',
                    smss: smss,
                });
            })
        } else {
            res.status(403).json({
                message: 'Not allowed.',
            });
        }
    })
}

function sendSMSSPARROW(req,res,next, smsContent, to){
    {
        let sendSuccess = false;
        console.log("########## SMS ###########");
        const token = GLOBALtoken;
        const identity = GLOBALidentity;
        const formData = {
            token:token,
            from: identity,
            to: to,
            text: smsContent
        }

        const encodeForm = (data) => {
            return Object.keys(data)
                .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                .join('&');
        }

        console.log(token + " " + identity + " "+ to + " " + smsContent)
        axios
        .post('http://api.sparrowsms.com/v2/sms/', encodeForm(formData))
        .then(res =>{
            sendSuccess = true;
            // console.log(res);
            let count = res.data.count;
            let response = res.data.response;
            let message_id = res.data.message_id
            let credit_consumed = res.data.credit_consumed
            let credit_available = res.data.credit_available

            let data = {
                "error":false,
                "count": count,
                "message": response,
                "message_id": message_id,
                "credit_consumed": credit_consumed,
                "credit_available": credit_available,
            }
            console.log("Success");
            console.log(data);

            res.status(200).json({
                count: count,
                message: response,
                message_id: message_id,
                credit_consumed: credit_consumed,
                credit_available: credit_available,
            })
        })
        .catch(error =>{
            console.log("ERROR")
            if(sendSuccess){
                console.log("No it Succedded.")
                res.status(200).json({
                    extraMessage: "this is from catch success",
                    message: "Message queed for sending."
                })
            } else {
                console.log("Error")
                error.message= "Error on Sending sms to users"
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                next(error);
            }
        })
    }
}