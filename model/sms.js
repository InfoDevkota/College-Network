const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const smsSchema = new Schema({
    message:{
        type: String,
        required: true
    },
    semester:{
        type: Schema.Types.ObjectId,
        ref: "Semester"
    },
    section:{
        type: Schema.Types.ObjectId,
        ref: "Section"
    },
    department:{
        type: Schema.Types.ObjectId,
        ref: "Department"
    },
    sendBy:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("SMS", smsSchema);