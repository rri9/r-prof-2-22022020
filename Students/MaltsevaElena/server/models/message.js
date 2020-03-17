const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema ({
   sender: { type: String, required: true },
   text: { type: String, required: true },
   messageId: { type: String,required: true, default: Date.now },
   chatId: { type: String, required: true },
})

module.exports = mongoose.model('Message', messageSchema)