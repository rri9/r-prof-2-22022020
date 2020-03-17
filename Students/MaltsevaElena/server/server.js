const express = require('express')
const mongoose = require('mongoose')
const Message = require('./models/message.js')

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

// API
app.get('/messages', async (req, res) => {
   const messages = await Message.find()
   res.json(messages)
})

app.post('/message', async (req, res) => {
   let message = new Message (req.body)
   message = await message.save()
   res.send(JSON.stringify({status: 1}))
})