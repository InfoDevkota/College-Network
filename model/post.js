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
            ref: "User",
            required: true
        },
        likes:[{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        totalLike:{
            type:Number
        },
        imageUrl: {
            type: String
        },
        date:{
            type: String,
            required: true
        },
        broadcast:{
            type:Boolean,
        },
        liked:{
            type:Boolean
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Post", postSchema);