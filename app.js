const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');
const postRoutes = require('./routes/post');
const profileRoutes = require('./routes/profile');
const apiRoutes = require('./routes/api/api');

const Student = require('./model/student');

const app = express();

app.use(bodyParser.json());
app.use("/api",apiRoutes);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
    session({
        secret: 'ThisisSecret',
        resave: false,
        saveUninitialized: false
    })
);

app.use((req,res,next) => {
    if(!req.session.student) {
        return next();
    }
    Student
    .findById(req.session.student._id)
    .then(student =>{
        if(student){
            req.student = student;
            return next();
        }
        next();
    })
    .catch(error =>{
        console.log(error);
        next();
    })
});


app.use('/', express.static(path.join(__dirname, 'static')));
app.use(homeRoutes);
app.use(authRoutes);
app.use(postRoutes);
app.use(profileRoutes);

app.use((req,res,next) => {
    console.log("404 not Found.");
    res.write(`
        <h1>404 Not Found</h1>
    `);
    res.end();
})

mongoose
.connect('mongodb://localhost/collegeNetwork')
.then(result => {
    app.listen(4080);
    console.log("Server Started at Port 4080");
})
.catch(error => console.log(error));