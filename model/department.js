const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    name:{
        type: String,
    },
    id:{
        type:String
    },
    hod:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    intro:{
        type: String
    },
    photo:{
        type: String
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }]
});

module.exports = mongoose.model('Department', departmentSchema);