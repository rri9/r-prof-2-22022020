const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const installSchema = new Schema({
  installs: { type: Number },
});

module.exports = mongoose.model('install', installSchema);
