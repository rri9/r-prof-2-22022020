const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  userName: { type: String },
  userEmail: { type: String },
  userAge: { type: Number },
});

module.exports = mongoose.model('profile', profileSchema);
