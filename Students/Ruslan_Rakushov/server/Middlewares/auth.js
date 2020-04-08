const jwt = require('jsonwebtoken');
const Profile = require('../Models/profile');
const { JWT_KEY } = require('../credentials');

const auth = async (req, res, next) => {
  try {
  // const token = req.header('Authorization').split(' ')[1];
    let token;
    if (req.header('Authorization')) {
      token = req.header('Authorization').replace('Bearer ', '');
    }
    if (!token && req.cookies.token) {
      token = req.cookies.token;
    }
    const data = jwt.verify(token, JWT_KEY);
    const user = await Profile.findOne({ _id: data._id, 'tokens.token': token });
    if (!user) {
      throw new Error('Auth error')
    }
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Authorize first!' });
  }
}

module.exports = auth;
