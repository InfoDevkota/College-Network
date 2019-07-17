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
        type: String
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
    graduationOn:{//graduation_on
        type: String
    },
    bornOn:{//born_on
        type: Date
    },
    livesIn:{//lives_in
        type: String
    },
    gender:{
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);