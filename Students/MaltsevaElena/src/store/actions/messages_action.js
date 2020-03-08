export let SEND_MSG = '@@messages/SEND_MSG'

export let sendMessage = (chatId, messageId, sender=null, text) => ({
   type: SEND_MSG,
   chatId: chatId,
   messageId: messageId,
   sender: sender,
   text: text
})