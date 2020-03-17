export const SEND_MESSAGE = '@@message/SEND_MESSAGE'; //TODO Что именно дает синтаксис @@
export const DEL_MESSAGE = '@@message/DEL_MESSAGE';

export const sendMessage = (sender, text, chatId) => ({
  type: SEND_MESSAGE,
  sender,
  text,
  chatId,
});

export const delMessage = (msgId) => ({
  type: DEL_MESSAGE,
  msgId,
});