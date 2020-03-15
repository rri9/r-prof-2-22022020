export const ADD_MSG = '@@messages/ADD_MSG';

export const addMessage = (messageId, sender, text, chatId) => ({
   type: ADD_MSG,
   messageId,
   sender, 
   text,
   chatId
});