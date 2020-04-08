const express = require('express');
const User = require('../Models/user');

const router = express.Router();

router.post('/registration', async (req, res) => {
  try {
    // TODO Проверить формат email (or in front?)
    if (await User.findOne({ email: req.body.email })) {
      console.log('user email must be unique');
      return res.status(400).json({ error: 'This email is already registered.' });
    }
    const user = new User(req.body);
    user.token = '';
    await user.save();
    // TODO del password
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Login failed' });
    }
    await user.generateAuthToken();
    // TODO Если выбрано "Запомнить" res.cookie(`token=${token}; HttpOnly; path='/'`);
    // TODO del password
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message});
  }
});

module.exports = router;
