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
    phone:{
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);