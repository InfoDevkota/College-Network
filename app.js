const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const socketIO = require('socket.io');
const http = require('http');
const _ = require("lodash")
require('dotenv/config');

const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');
const apiRoutes = require('./routes/api/api');
const adminRoutes = require('./routes/admin');
const chatV1Controller = require('./controller/api/v1/chat');//Check

const Student = require('./model/student');
const { GlobalRoom } = require('./helpers/GlobalRoom');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
server.listen(process.env.PORT || 4080, function() {
    console.log('Listerning on port'+process.env.PORT || 4080)
});
require("./socket/conversation")(io);
require("./socket/globalRoom")(io, GlobalRoom, _);
// const fileStorage = multer.diskStorage({
//     destination: (req,file,callback) =>{
//         callback(null,'images');
//     },
//     filename: (req,file,callback) =>{
// 	let date = new Date();
// 	let mm = date.getMonth();
// 	let dd = date.getDate();
// 	let yyyy = date.getFullYear();
// 	let h = date.getHours();
// 	let i = date.getMinutes();
// 	let s = date.getMilliseconds();	

// 	let id_photo = mm + '-' + dd + '-' + yyyy + '-' + h + '_' + i + '_' + s;
// 	console.log(id_photo + '-' + file.originalname);
//         callback(null, id_photo + '-' + file.originalname);
//     }
// });

// const fileFilter = (req,file,callback) => {
//     if(
//         file.mimetype === 'image/png' ||
//         file.mimetype === 'image/jpg' ||
//         file.mimetype === 'image/jpeg'
//     ){
//         callback(null, true);
//     } else {
//         callback(null, false);
//     }
// }
// app.use(
//     multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
// );
// const fileFilter = (req,file,callback) => {
//     if(
//         file.mimetype === 'image/png' ||
//         file.mimetype === 'image/jpg' ||
//         file.mimetype === 'image/jpeg'
//     ){
//         callback(null, true);
//     } else {
//         callback(null, false);
//     }
// }

// const noteFileStorage = multer.diskStorage({
//     destination: (req,file,callback) =>{
//         callback(null,'notes');
//     },
//     filename: (req,file,callback) =>{
// 	let date = new Date();
// 	let mm = date.getMonth();
// 	let dd = date.getDate();
// 	let yyyy = date.getFullYear();
// 	let h = date.getHours();
// 	let i = date.getMinutes();
// 	let s = date.getMilliseconds();	

// 	let id_note = mm + '-' + dd + '-' + yyyy + '-' + h + '_' + i + '_' + s;
// 	console.log(id_note + '-' + file.originalname);
//         callback(null, id_note + '-' + file.originalname);
//     }
// });

// const noteFileFilter = (req,file,callback) => {
//     var ext = path.extname(file.originalname);
//     if(ext == '.pdf' || ext == '.docs') {
//         callback(null, true)
//     } else {
//         //callback(new Error('Only images are allowed'))
//         callback(null, false);
//     }
// }
app.use(cors());
app.use(bodyParser.json());
// app.use(
//     multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
// );
// app.use(
//     multer({ storage: noteFileStorage, fileFilter: noteFileFilter }).single('note')
// );
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/notes', express.static(path.join(__dirname, 'notes')));
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
app.use('/admin', adminRoutes);
app.use(authRoutes);

app.use((req,res,next) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("404 not Found. For URL: " + fullUrl);
    res.write(`
        <h1>404 Not Found</h1>
    `);
    res.end();
})

mongoose
.connect(process.env.DB_CONNECTION, { useCreateIndex: true, useNewUrlParser: true })
.then(result => {
    // const server = app.listen(process.env.PORT || 4080);
    // chatV1Controller(server);
    console.log("Server Started at Port " + (process.env.PORT || 4080));
})
.catch(error => console.log(error));