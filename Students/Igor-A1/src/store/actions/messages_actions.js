export const SEND_MSG = '@@messages/SEND_MSG';

export const sendMessage = (chatId, msgId, sender, text) => ({
    type: SEND_MSG,
    chatId: chatId,
    msgId: msgId,
    sender: sender,
    text: text
});