export let SEND_MSG = '@@messages/SEND_MSG';
export let ADD_MSG_ID = '@@messages/ADD_MSG_ID';

export let sendMessage = (messageId, chatId, sender, text) => ({
    type: SEND_MSG,
    chatId: chatId,
    messageId: messageId,
    sender: sender,
    text: text
})

export let addMessageId = () => ({
    type: ADD_MSG_ID
})