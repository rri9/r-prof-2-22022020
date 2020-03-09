export let SEND_MSG = '@@messages/SEND_MSG'

export let sendMessage = (messagesId, sender, text) => ({
    type: SEND_MSG,
    messagesId: messagesId,
    sender: sender,
    text: text
})