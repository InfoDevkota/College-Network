const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        content:{
            type: String,
            required: true
        },
        postedBy:{
            type: Schema.Types.ObjectId,
            ref: "Student",
            required: true
        },
        imageUrl: {
            type: String
        },
        date:{
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Post", postSchema);