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
    files: [{
        type: String
    }],
    preview: {
        type: String,
        default: "static/notePlaceHolder.png"
    }
},
{ timestamps: true }
)

module.exports = mongoose.model("Note", noteSchema);