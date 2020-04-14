const Chat = require('../Models/chat');
const { Message } = require('../Models/message');

module.exports = {
  async load(req, res) {
    try {
      const chats = await Chat.find();
      res.status(200).json(chats);
    } catch (err) {
      res.status(500).json({ error: `Error loading chats: ${err.message}` });
    }
  },

  async add(req, res) {
    try {
      const chat = new Chat(req.body.chat);
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
    } catch (err) {
      res.status(500).json({ error: `Error deleting chat: ${err.message}` });
    }
  },

  async addMessage(req, res) {
    try {
      const chat = await Chat.findById(req.body.chatId);
      const message = new Message(req.body.message);
      chat.messages.push(message);
      await chat.save();
      res.status(200).json({messageId: message._id});
    } catch (err) {
      res.status(500).json({ error: `Error adding message: ${err.message}` });
    }
  },

  async deleteMessage(req, res) {
    try {
      const chat = await Chat.findOne({ _id: req.body.chatId });
      await chat.messages.pull(req.body.messageId);
      await chat.save();
      res.status(200).json({message: 'Delete message success'});
    } catch (err) {
      res.status(500).json({ error: `Error deleting message: ${err.message}` });
    }
  },
}