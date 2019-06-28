const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('UserType', userTypeSchema);