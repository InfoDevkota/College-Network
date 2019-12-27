
const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    conversation_name: {type: String},
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Conversation', ConversationSchema);