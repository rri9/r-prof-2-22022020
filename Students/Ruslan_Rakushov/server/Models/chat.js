const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { messageSchema } = require('./message');

const chatSchema = new Schema({
  title: { type: String, required: true },
  messages: [messageSchema],
});

module.exports = mongoose.model('chat', chatSchema);
