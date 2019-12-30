const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    link:{
        type: String
    },
    semester:{
        type: Schema.Types.ObjectId,
        ref: "Semester"
    },
    projectBy:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Project", projectSchema);