// Auth provided by https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// const socketIO = require('soc');
const port = 3300;
const { MongoDBUser, MongoDBPassword } = require('./credentials');
const uri = `mongodb+srv://${MongoDBUser}:${MongoDBPassword}@cluster0-4qota.gcp.mongodb.net/reactGramm-v2?retryWrites=true&w=majority`;

const userRouter = require('./Router/userRouter.js');
const auth = require('./Middlewares/auth');

const messageController = require('./Controllers/messageController.js');
const chatController = require('./Controllers/chatController.js');
const profileController = require('./Controllers/profileController.js');
const installController = require('./Controllers/installController.js');

const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(userRouter);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true, // FIX Is it necessary for auth?
})
  .then(() => { console.log('DB connected') })
  .catch((err) => { console.log('DB connection error', err) });

app.use(auth);

app.get('/messages', messageController.load);
app.post('/message', messageController.send);
app.delete('/message/:id', messageController.delete);
  
app.get('/chats', chatController.load);
app.post('/chat', chatController.add);
app.delete('/chat/:id', chatController.delete);

app.get('/profile', profileController.load);
app.post('/profile', profileController.send);

app.get('/install', installController.installCount);

//Test
// app.get('/', (req, res) => {
//   res.send('test')
// });

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});