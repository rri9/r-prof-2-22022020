// Auth provided by https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122

const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const isAuthorized = require('./Middlewares/isAuthorized');
const authorization = require('./Router/authorization');

const { MongoDBUser, MongoDBPassword } = require('./credentials');
const port = 3300;
const uri = `mongodb+srv://${MongoDBUser}:${MongoDBPassword}@cluster0-4qota.gcp.mongodb.net/reactGramm-v2?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  // useCreateIndex: true, // FIX Is it necessary for auth?
})
  .then(() => { console.log('DB connected') })
  .then(() => { start() })
  .catch((err) => { console.log('DB connection error', err) });

function start() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   next();
  // });

  app.use(authorization); // Открытый доступ к авторизации/регистрации

  app.use(isAuthorized);

  app.get('/', (req, res) => {
    res.send('Server is up!');
  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
  });
}