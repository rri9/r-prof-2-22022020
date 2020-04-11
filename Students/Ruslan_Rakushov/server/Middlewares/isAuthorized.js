const jwt = require('jsonwebtoken');
const User = require('../Models/user');
const { JWT_KEY } = require('../credentials');

const isAuthorized = async (req, res, next) => {
  try {
    let token;
    if (req.header('Authorization')) {
      token = req.header('Authorization').replace('Bearer ', '');
    }
    const data = jwt.verify(token, JWT_KEY);
    const user = await User.findOne({
      _id: data._id,
      email: data.email,
      token: token,
    });
    if (!user) {
      throw new Error("You are not authorized!");
    }
    req.token = token;
    req.email = data.email;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Authorization error: ' + err.message });
  }
};

module.exports = isAuthorized;
