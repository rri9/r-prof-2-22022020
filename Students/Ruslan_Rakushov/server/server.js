// Auth provided by https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122

const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');

const isAuthorized = require('./Middlewares/isAuthorized');
const authorization = require('./Router/authorization');

const chatController = require('./Controllers/chatController');
const userController = require('./Controllers/userController');

const { MongoDBUser, MongoDBPassword } = require('./credentials');
const port = 3300;
const uri = `mongodb+srv://${MongoDBUser}:${MongoDBPassword}@cluster0-4qota.gcp.mongodb.net/reactGramm-v2?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => { console.log('DB connected') })
  .then(() => { start() })
  .catch((err) => { console.log('DB connection error', err) });

function start() {
  const app = express();

  // WebSockets
  const server = http.Server(app);
  const io = socketIO(server);
  app.use((req, res, next) => {
    req.io = io;
    next();
  });

  app.use(express.json());
  app.use(cookieParser());
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   next();
  // });

  app.use(authorization); // Открытый доступ к авторизации/регистрации

  app.use(isAuthorized);

  app.get('/chats', chatController.load);
  app.post('/chat', chatController.add);
  app.delete('/chat/:id', chatController.delete);

  app.post('/message', chatController.addMessage);
  app.delete('/message', chatController.deleteMessage);

  app.post('/user', userController.update);

  app.get('/', (req, res) => {
    res.send('Server is up!');
  });

  server.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
  });
}