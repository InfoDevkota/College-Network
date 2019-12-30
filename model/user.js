const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    userName: {
        type: String
    },
    profileImage: {
        type: String,
        default: "static/placeHolder.png"
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    userType: {
        type: Schema.Types.ObjectId,
        ref: "UserType"
    },
    semester:{
        type: Schema.Types.ObjectId,
        ref: "Semester"
    },
    department:{
        type: Schema.Types.ObjectId,
        ref: "Department"
    },
    section:{
        type: Schema.Types.ObjectId,
        ref: "Section"
    },
    messageBoxUser:[{
        userId:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        messageBox:{
            type: Schema.Types.ObjectId,
            ref: "MessageBox"
        }
    }],
    phone:{
        type: String
    },
    college:{
        type: String
    },
    graduationOn:{
        type: String
    },
    bornOn:{
        type: String
    },
    livesIn:{
        type: String
    },
    gender:{
        type: String
    },
    ishod:{
        type: Boolean,
        default: false
    }, 
    isTeacher:{
        type: Boolean,
        default: false
    },
    isStudent:{
        type: Boolean,
        default: false
    },
    projects:[{
        type: Schema.Types.ObjectId,
        ref: "Project"
    }],
    notes:[{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }],
    isVerified:{
        type: Boolean,
        default: false
    },
    verificationImages: [{
        type: String
    }],

    //TODO DONE Notes
});

module.exports = mongoose.model('User', userSchema);