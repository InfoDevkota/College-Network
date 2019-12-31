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
        postedFor:{
            isDepartment: {
                type:Boolean,
                default: false
            },
            department:{
                type:Schema.Types.ObjectId,
                ref: "Department"
            }
        },
        likes:[{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        comments:[{
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }],
        totalComments:{
            type: Number,
            default:0
        },
        totalLike:{
            type:Number,
            default:0
        },
        imageUrl: [{
            type: String
        }],
        date:{
            type: String,
            required: true
        },
        broadcast:{
            type:Boolean,
        },
        liked:{
            type:Boolean
        },
        visibilityPublic:{
            type: Boolean
        },
        department:{
            type:Schema.Types.ObjectId,
            ref: "Department"
        }

    },
    { timestamps: true }
)

module.exports = mongoose.model("Post", postSchema);