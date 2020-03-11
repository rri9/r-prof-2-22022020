export const SEND_MESSAGE = '@@message/SEND_MESSAGE'; //TODO Что именно дает синтаксис @@

export const sendMessage = (msgId, sender, text, chatId) => ({
  type: SEND_MESSAGE,
  msgId,
  sender,
  text,
  chatId,
});