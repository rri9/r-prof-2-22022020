const Chat = require('../Models/chat.js');

module.exports = {
  async load(req, res) {
    const chats = await Chat.find();
    res.json(chats);
  },

  async add(req, res) {
    try {
      let chat = new Chats(req.body);
      await chat.save();
      res.json({ status: 1, chatId: chat._id });
    } catch {
      res.json({ status: false });
    }
  },
  async delete(req, res) {
    try {
      await Chat.findByIdAndDelete(req.params['id']);
      res.json({ status: 1 });
    } catch {
      res.json({ status: false });
    }
  },
};
