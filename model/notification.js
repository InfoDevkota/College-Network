const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    message:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    for:{
        type: Schema.Types.ObjectId,
        ref="User",
        required: true
    },
    post:{
        type: Schema.type.ObjectId,
        ref="Post"
    },
    read:{
        type:Boolean,
        default:false
    }
    
})

module.exports = mongoose.model("Notification", notificationSchema);