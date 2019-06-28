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
        type:String
    }
});

module.exports = mongoose.model('Department', departmentSchema);