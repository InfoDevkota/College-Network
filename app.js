const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const multer = require('multer');
// get env variables
require('dotenv/config');


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log('connected to DB ..')
})

const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');
const apiRoutes = require('./routes/api/api');
const adminRoutes = require('./routes/admin');
const chatRoutes = require('./routes/api/v1/chat');//Check

const Student = require('./model/student');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req,file,callback) =>{
        callback(null,'images');
    },
    filename: (req,file,callback) =>{
        callback(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req,file,callback) => {
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ){
        callback(null, true);
    } else {
        callback(null, false);
    }
}

app.use(bodyParser.json());
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));
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
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(homeRoutes);
app.use("/admin",adminRoutes);
app.use(authRoutes);

app.use((req,res,next) => {
    console.log("404 not Found.");
    res.write(`
        <h1>404 Not Found</h1>
    `);
    res.end();
})


const server = app.listen(process.env.port || 4080, () => {
    console.log('now listening for requests...')
});
chatRoutes(server);