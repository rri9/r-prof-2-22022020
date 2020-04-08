const express = require('express');
const auth = require('../Middlewares/auth');
const User = require('../Models/user');

const router = express.Router();

router.post('/users', async (req, res) => {
  try {
    // TODO Если пользователь с таким именем/почтой существует
    if (await User.findOne({ userName: req.body.userName })) {
      console.log('userName must be uniq')
      return res.status(400).json({ error: 'Try another login' });
    }
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/users/login', async (req, res) => {
  try {
    console.log('req.body', req.body);
    console.log('req.cookies', req.cookies);
    const { userName, password } = req.body;
    const user = await User.findByCredentials(userName, password);
    if (!user) {
      return res.status(401).send({ error: 'Login failed' });
    }
    const token = await user.generateAuthToken();
    res.cookie(`token=${token}; HttpOnly; path='/'`);
    res.send({ status: 1, user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/users/me', auth, async (req, res) => {
  console.log('in userRouter.get');
  
  res.send(req);
});

module.exports = router;
