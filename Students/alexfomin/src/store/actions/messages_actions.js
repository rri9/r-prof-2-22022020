export let SEND_MSG = '@@messages/SEND_MSG'
export let SEND_ANS = '@@messages/SEND_ANS'

export let sendMessage = (messageId, sender, text, chatId) => ({
    type: SEND_MSG,
    messageId: messageId,
    sender: sender,
    text: text,
    chatId: chatId
})

export let sendAnswer = (messageId, sender, text, chatId) => ({
    type: SEND_ANS,
    messageId: messageId,
    sender: sender,
    text: text,
    chatId: chatId
})