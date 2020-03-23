const express = require('express');
const mongoose = require('mongoose');
const Message = require('./Models/message.js');
const port = 3300;
const uri = "mongodb+srv://geek:geek@cluster0-4qota.gcp.mongodb.net/reactGramm-v2?retryWrites=true&w=majority";

const app = express();
app.use(express.json());

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => { console.log('DB connected') })
  .catch((err) => { console.log('DB connection error', err) });

app.post('/message', async (req, res) => {
  let message = new Message(req.body);
  await message.save();
  //TODO Что в случае ошибки действия с БД? ( использовать .then .catch ? )
  res.json({status: 1, msgId: message._id});
});

app.get('/messages', async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

app.delete('/message/:id', async (req, res) => {
  await Message.findByIdAndDelete(req.params['id']);
  res.json({status: 1});
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});