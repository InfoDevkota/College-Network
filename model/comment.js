const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        comment:{
            type: String,
            required: true
        },
        commentBy:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        commentOn:{
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true
        },
        edited:{
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Comment", commentSchema);