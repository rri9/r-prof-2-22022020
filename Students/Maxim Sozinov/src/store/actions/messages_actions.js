export const SEND_MSG = '@@messages/SEND_MSG';

export const sendMessage = (messageId, sender, text, chatId) => ({
   type: SEND_MSG,
   messageId,
   sender, 
   text,
   chatId
});