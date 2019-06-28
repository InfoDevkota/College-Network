const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
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
    posts: [{
        type: Schema.Types.ObjectId,
        ref:"Post"
    }],
    semester:{
        type: String
    }
});

let User = module.exports = mongoose.model('Student', studentSchema);

// module.exports.findByUserName = (userName) =>{
//     let query = {userName: userName}
//     User.findOne(query)
//     .then(student =>{
//         if(student){
//             return student;
//         } else {
//             return false;
//         }
//     });
// }