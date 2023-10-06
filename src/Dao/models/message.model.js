const mongoose = require('mongoose');
const messageCollection = "messages";

const messageSchema = new mongoose.Schema({
    user: {type:String},
    message: {type:String},
});

const messageModel = mongoose.model(messageCollection, messageSchema);

module.exports = { messageModel };
