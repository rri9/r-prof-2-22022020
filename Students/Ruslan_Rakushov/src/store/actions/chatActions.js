export const ADD_MESSAGE_COUNT = '@@chat/ADD_MESSAGE_COUNT'; //TODO Что именно дает синтаксис @@
export const ADD_CHAT = '@@chat/ADD_CHAT';
export const BLINK_CHAT = '@@chat/BLINK_CHAT';

export const addMsgCount = (chatId) => ({
  type: ADD_MESSAGE_COUNT,
  chatId,
});

export const addChat = (title) => ({
  type: ADD_CHAT,
  title,
});

export const blinkChat = (chatId) => ({
  type: BLINK_CHAT,
  chatId,
});
