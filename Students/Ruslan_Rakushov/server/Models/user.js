const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../credentials');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  age: { type: Number },
  password: { type: String },
  token: { type: String },
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
  //TODO Добавить поле expiredIn и не хранить токен на сервере?
  //TODO Либо Периодическое удаление токенов пользователей (добавить дату выдачи)
  const token = jwt.sign({ _id: user._id, email: user.email }, JWT_KEY);
  user.token = token;
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email: email });
  if (!user) {
    console.log(`No user with email '${email}' found`);
    throw new Error(`Email '${email}' didn't found`);
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    console.log(`Wrong password for email '${email}'`);
    throw new Error(`Wrong password for email '${email}'`);
  }
  return user;
};

userSchema.statics.deleteAuthToken = async function (email) {
  const user = await User.findOne({ email: email });
  if (!user) {
    console.log(`No user with email '${email}' found`);
    throw new Error(`Email '${email}' didn't found`);
  }
  user.token = '';
  await user.save();
  return 1;
};

const User = mongoose.model('user', userSchema);
module.exports = User;
