const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../credentials');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  userName: { type: String },
  userEmail: { type: String },
  userAge: { type: Number },
  password: { type: String },
  tokens: [{
    token: {
      type: String
    }
  }]
});

profileSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 12);
  }
  next();
});

profileSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id, userName: user.userName }, JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

profileSchema.statics.findByCredentials = async function (userName, password) {
  // const user = await Profile.findOne({ userName });
  const hash = await bcrypt.hash(password, 12);
  console.log('hash=', hash)
  const user = await Profile.findOne({ userName: userName, password: hash }); //FIX убрать после добавления проверки на уникальность при регистрации
  if (!user) {
    console.log('Wrong user name/password')
    throw new Error({ error: 'Wrong user name'});
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password); // FIX bcrypt здесь и в преобразовании тоже
  // const isPasswordMatch = user.password === password ? true : false;
  if (!isPasswordMatch) {
    console.log('Wrong password')
    throw new Error({ error: 'Wrong password'});
  }
  console.log('in findByCredentials user:', user)
  return user;
};

const Profile = mongoose.model('profile', profileSchema);
module.exports = Profile;
