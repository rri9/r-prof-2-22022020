const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    messageID: {
        type: String,
        required: true,
        default: 'MSG' + Date.now()
    },
    chatID: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('message', messageSchema)