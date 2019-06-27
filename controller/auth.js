const bcrypt = require('bcryptjs');

const Student = require('../model/student');

exports.getSignup = (req,res,next) => {
    res.render('signup', {
        student: true
    })
}

exports.postSignup = (req,res,next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const conformPassword = req.body.conformPassword;

    Student
    .findOne({ email: email})
    .then(user =>{
        if(user){
            //user exist with this mail
            //Display error
            return res.redirect('/signup');
        }
        return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const student = new Student({
                email: email,
                name: name,
                password: hashedPassword
            });
            return student.save();
        })
        .then(result=>{
            res.redirect('/login');
        })
        .catch(error =>{
            console.log(error);
        })
    })
    .catch(error => {
        console.log(error);
    })
}

exports.getLogin = (req,res,next) => {
    res.render('login', {
        student: true
    })
}

exports.postLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    Student
    .findOne({ email: email })
    .then(student => {
        if(!student) {
            //no email with this mail;
            return res.redirect('/login');
        }
        return bcrypt
        .compare(password, student.password)
        .then(isMatched => {
            if(isMatched) {
                console.log("Password Matched");
                req.session.isLoggedIn = true;
                req.session.student = student
                //req.session.save();
                res.redirect('/');
            } else {
                console.log("Password not matched");
                return res.redirect('/login');
            }
        })
        .catch(error =>{
            console.log(error);
        })
    })
    .catch(error=>{
        console.log(error);
    })
}