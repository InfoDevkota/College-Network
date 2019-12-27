const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    noteBy:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    noteByName:{
        type: String
    },
    uploadedby:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    file: {
        type: String
    },
    preview: {
        type: String,
        default: "static/notePlaceHolder.png"
    },
})

module.exports = mongoose.model("Note", noteSchema);