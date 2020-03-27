const Message = require('../Models/message.js');

module.exports = {
  async load(req, res) {
    const messages = await Message.find();
    res.json(messages);
  },

  async send(req, res) {
    try {
      let message = new Message(req.body);
      await message.save();
      res.json({ status: 1, msgId: message._id });
    } catch {
      res.json({ status: false });
    }
  },
  async delete(req, res) {
    try {
      await Message.findByIdAndDelete(req.params['id']);
      res.json({ status: 1 });
    } catch {
      res.json({ status: false });
    }
  },
};
