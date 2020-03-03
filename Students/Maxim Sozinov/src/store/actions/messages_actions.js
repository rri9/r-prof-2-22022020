export const SEND_MSG = '@@messages/SEND_MSG';

export const sendMessage = (messageId, sender, text) => ({
   type: SEND_MSG,
   messageId,
   sender, 
   text
});