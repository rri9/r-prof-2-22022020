const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  title: { type: String, required: true },
  messages: { type: Array},
});

module.exports = mongoose.model('chat', chatSchema);
