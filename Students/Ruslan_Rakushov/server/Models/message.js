const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: { type: String, required: true },
  text:   { type: String, required: true },
});

module.exports = {
  Message: mongoose.model('message', messageSchema),
  messageSchema,
}
