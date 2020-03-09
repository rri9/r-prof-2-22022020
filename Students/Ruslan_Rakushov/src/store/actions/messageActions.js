export const SEND_MESSAGE = '@@message/SEND_MESSAGE'; //TODO Что именно дает синтаксис @@

export const sendMessage = (msgId, text, sender, chatId) => ({
  type: SEND_MESSAGE,
  msgId,
  text,
  sender,
  chatId,
});