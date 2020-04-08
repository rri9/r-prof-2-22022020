const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../credentials');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:     { type: String },
  email:    { type: String },
  age:      { type: Number },
  password: { type: String },
  tokens:   {type: Array},
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 12);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id, userName: user.userName }, JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async function (userName, password) {
  const hash = await bcrypt.hash(password, 12);
  console.log('hash=', hash)
  const user = await User.findOne({ userName: userName });
  if (!user) {
    console.log(`No user ${userName} found`)
    throw new Error({ error: 'Wrong user name'});
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    console.log(`Wrong password for ${userName}`)
    throw new Error({ error: 'Wrong password'});
  }
  return user;
};

const User = mongoose.model('user', userSchema);
module.exports = User;
