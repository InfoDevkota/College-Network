const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../../../model/user');

exports.postSignup = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const isStudent = req.body.isStudent;
    const isTeacher = req.body.isTeacher;

    User.findOne({ email: email })
    .then(user => {
        if(user){
            const error = new Error('Email Already Exist');
            error.statusCode = 422;
            error.data = [{
                        "value": email,
                        "msg": "Email already Exisits",
                        "param": "email",
                        "location": "body"
                    }
                ]
            throw error;
        }
        if(!isStudent && !isTeacher){ //TODO Need to check it may send two response back.
            res.status(422).json({ message: "Email Already Exist" });
            const error = new Error('Email Already Exist');
            throw error;
        }
        return  bcrypt.hash(password, 12);
    })
    .then(hashedPassword => {
        const user = new User({
            email: email,
            name: name,
            password: hashedPassword,
            isTeacher: isTeacher,
            isStudent: isStudent,
            verificationImage: file.path
        });
        return user.save();
    })
    .then(result=>{
        res.status(201).json({ message: 'User created!', userId: result._id });
    })
    .catch(error =>{
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}

exports.postLogin = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    
    User
    .findOne({ email: email })
    .then(user => {
        if(!user) {
            const error = new Error('A User with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        bcrypt.compare(password, user.password)
        .then(isMatched => {
            // console.log(isMatched);
            if(isMatched) {
                const token = jwt.sign(
                    {
                        email: user.email,
                        userId: user._id.toString(),
                        name: user.name,
                        profileImage: user.profileImage
                    },
                    'ThisIsASecretKeyAndKey'
                );
                res.status(200).json({ token: token, userId: user._id.toString(), name:user.name });
            } else {
                res.status(401).json({ message: "Wrong Password" });
            }
        })
    })
    .catch(error =>{
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    })
}