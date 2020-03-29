const express = require('express');
const mongoose = require('mongoose');
const port = 3300;
const uri = "mongodb+srv://geek:geek@cluster0-4qota.gcp.mongodb.net/reactGramm-v2?retryWrites=true&w=majority"; //FIX Убрать в отдельный файл credentials (можно только логин пароль)

const messageController = require('./Controllers/messageController.js');
const chatController = require('./Controllers/chatController.js');
const profileController = require('./Controllers/profileController.js');
const installController = require('./Controllers/installController.js');

const app = express();
app.use(express.json());

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => { console.log('DB connected') })
  .catch((err) => { console.log('DB connection error', err) });

app.get('/messages', messageController.load);
app.post('/message', messageController.send);
app.delete('/message/:id', messageController.delete);
  
app.get('/chats', chatController.load);
app.post('/chat', chatController.add);
app.delete('/chat/:id', chatController.delete);

app.get('/profile', profileController.load);
app.post('/profile', profileController.send);

app.get('/install', installController.installCount);

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});