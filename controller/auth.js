const bcrypt = require('bcryptjs');

const Admin = require('../model/admin');

exports.getSignup = (req,res,next) => {
    Admin
    .findOne()
    .then(admin => {
        if(admin){
            res.render('noSignUp', {
                
            })
        } else {
            res.render('signup', {
                admin: true
            })
        }
    })
}

exports.postSignup = (req,res,next) => {
    const userName = req.body.username;
    const password = req.body.password;

    bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
        const admin = new Admin({
            username: userName,
            password: hashedPassword
        });
        return admin.save();
    })
    .then(result=>{
        res.redirect('/login');
    })
    .catch(error =>{
        console.log(error);
    })
}

exports.getLogin = (req,res,next) => {
    res.render('login', {
        student: true
    })
}

exports.postLogin = (req,res,next) => {
    const userName = req.body.username;
    const password = req.body.password;
    Admin
    .findOne({ username: userName })
    .then(admin => {
        if(!admin) {
            //no email with this mail;
            return res.redirect('/login');
        }
        return bcrypt
        .compare(password, admin.password)
        .then(isMatched => {
            if(isMatched) {
                console.log("Password Matched");
                req.session.isLoggedIn = true;
                req.session.admin = admin
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