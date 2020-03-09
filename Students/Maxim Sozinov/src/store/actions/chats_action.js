export const ADD_CHAT = '@@chats/ADD_CHAT';

export const addChat = (chatId, title) => ({
   type: ADD_CHAT,
   chatId,
   title
});