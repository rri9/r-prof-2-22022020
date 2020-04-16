const User = require('../Models/user');

module.exports = {
  async update(req, res) {
    try {
      const user = await User.findOne({ _id: req.body.id, email: req.body.email });
      user.name = req.body.name;
      user.age = req.body.age;
      await user.save();
      res.status(200).json({ message: 'Update user info sucess'})
    } catch (err) {
      res.status(500).json({ error: `Error saving user data: ${err.message}` });
    }
  },
};
