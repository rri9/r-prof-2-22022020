export const ADD_MESSAGE_COUNT = '@@chat/ADD_MESSAGE_COUNT'; //TODO Что именно дает синтаксис @@

export const addMsgCount = (chatId) => ({
  type: ADD_MESSAGE_COUNT,
  chatId,
});