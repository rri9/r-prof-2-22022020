const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Message = require('./message');

const messageSchema = new Schema({
  sender: { type: String, required: true },
  text:   { type: String, required: true },
});

const chatSchema = new Schema({
  title: { type: String, required: true },
  messages: [messageSchema],
});

module.exports = mongoose.model('chat', chatSchema);
