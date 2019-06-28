const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageBoxSchema = new Schema({
    id:{
        type:String,
        required: true
    },
    messages:[{
        message:{
            type:String,
            require:true
        },
        from:{
            type:Schema.Types.ObjectId,
            ref="User",
            require:true
        },
        date:{
            type:String
        }
    }]
})

module.exports = mongoose.model("MessageBox", messageBoxSchema)