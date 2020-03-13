export let SEND_MSG = '@@messages/SEND_MSG'

export let sendMessage = (messageId, sender, text) => ({
    type: SEND_MSG,
    messageId: messageId,
    sender: sender,
    text: text
})