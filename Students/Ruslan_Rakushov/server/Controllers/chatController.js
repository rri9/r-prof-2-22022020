const Chat = require('../Models/chat');

module.exports = {
  async load(req, res) {
    const chats = Chat.find();
    res.json(chats);
  },

  async add(req, res) {
    try {
      let chat = new Chats(req.body);
      await chat.save();
      res.json({ chatId: chat._id });
    } catch (err) {
      res.json({ error: `Error adding chat: ${err.message}` });
    }
  },

  async delete(req, res) {
    try {
      await Chat.findByIdAndDelete(req.params['id']);
      res.json({ message: 'Delete chat success' });
    } catch {
      res.json({ error: `Error deleting chat: ${err.message}` });
    }
  },
}