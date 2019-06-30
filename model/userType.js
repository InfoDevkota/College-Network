const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type:String
    }
});

module.exports = mongoose.model('UserType', userTypeSchema);