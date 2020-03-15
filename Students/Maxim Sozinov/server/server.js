const express = require('express');
// const path = require('path');
const mongoose = require('mongoose');

const config = require('./config.json');

mongoose.connect( "mongodb://localhost:27017", config)
   .then ( () => { console.log('connected to DB'); } )
   .catch ( err => { console.log(err); } );
// (err) => {
//     if (err) {
//         return console.log(err);
//     }
//     return console.log('connected to DB');
// });

// const Router = require('./routes/router');

const app = express();

app.use(express.json());
// app.use(express.urlencoded({
//     extended: true
// }));
// app.use(express.static(path.resolve(__dirname, 'dist')));

// app.use('/', Router);

const Message = require('./models/Message');

app.post ('/message', async (req, res) => {
   const message = new Message (req.body);
   const newMessage = await message.save();
   res.send(newMessage);
});

app.listen(3300, () => {
    console.log('Server listening at port 3300...', new Date());
});