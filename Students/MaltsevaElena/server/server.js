const express = require('express')
const mongoose = require('mongoose')
const Message = require('./models/message.js')
const Chat = require('./models/chat.js')

const app = express()

// Middlewares
app.use(express.json())

// Server
const port = 3300
app.listen(port, () => {
   console.log(`Server is listening on port ${port}`)
})

// Database
mongoose.connect('mongodb://localhost/reactgram-v2', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false
})
   .then(() => { console.log('Database connected') })
   .catch(error => { console.log('Database disconnected:', error) })


// API for messages
app.get('/messages', async (req, res) => {
   const messages = await Message.find()
   res.json(messages)
})

app.post('/message', async (req, res) => {
   let message = new Message (req.body)
   message = await message.save()
   res.json(message)
})


// API for chats
app.get('/chats', async(req, res) => {
   const chats = await Chat.find()
   res.json(chats)
})

app.post('/chat', async (req, res) => {
   let chat = new Chat (req.body)
   chat = await chat.save()
   res.json(chat)
})

app.delete('/chat', async (req, res) => {
   await Chat.findOneAndDelete({ _id: req.body.chatId })
   await Message.deleteMany({ chatId: req.body.chatId })
   res.json({ _id: req.body.chatId })
})