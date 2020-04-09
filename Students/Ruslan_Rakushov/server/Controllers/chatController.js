const Chat = require('../Models/chat');

module.exports = {
  async load(req, res) {
    const chats = Chat.find();
    res.status(200).json(chats);
  },

  async add(req, res) {
    try {
      let chat = new Chats(req.body);
      await chat.save();
      res.status(201).json({ chatId: chat._id });
    } catch (err) {
      res.status(500).json({ error: `Error adding chat: ${err.message}` });
    }
  },

  async delete(req, res) {
    try {
      await Chat.findByIdAndDelete(req.params['id']);
      res.status(200).json({ message: 'Delete chat success' });
    } catch {
      res.status(500).json({ error: `Error deleting chat: ${err.message}` });
    }
  },
}