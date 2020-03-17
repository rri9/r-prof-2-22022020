export let SEND_MSG = '@@messages/SEND_MSG'

export let sendMessage = (messageId, sender, text, chatId) => ({
    type: SEND_MSG,
    messageId: messageId,
    sender: sender,
    text: text,
    chatId: chatId
})