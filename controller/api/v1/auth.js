const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const Student = require('../../../model/student');

exports.getSignup = (req,res,next) => {
    res.render('signup', {
        student: true
    })
}

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

    Student.findOne({ email: email })
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
        return  bcrypt.hash(password, 12);
    })
    .then(hashedPassword => {
        const student = new Student({
            email: email,
            name: name,
            password: hashedPassword
        });
        return student.save();
    })
    .then(result=>{
        res.status(201).json({ message: 'User created!', studentId: result._id });
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
    
    Student
    .findOne({ email: email })
    .then(student => {
        if(!student) {
            const error = new Error('A Student with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        bcrypt.compare(password, student.password)
        .then(isMatched => {
            if(isMatched) {
                const token = jwt.sign(
                    {
                        email: student.email,
                        studentId: student._id.toString()
                    },
                    'ThisIsASecretKeyAndKey'
                );
                res.status(200).json({ token: token, studentId: student._id.toString() });
            } else {
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
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