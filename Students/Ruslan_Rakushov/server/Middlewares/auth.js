const jwt = require('jsonwebtoken');
const User = require('../Models/user');
const { JWT_KEY } = require('../credentials');

const auth = async (req, res, next) => {
  next();
}

module.exports = auth;
