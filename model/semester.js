const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const semesterSchema = new Schema({
    name:{
        type: String,
    },
    number:{
        type:String
    }
});

module.exports = mongoose.model('Semester', semesterSchema);