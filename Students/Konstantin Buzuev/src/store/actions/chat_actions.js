export let SEND_MSG = "@@chat/SEND_MSG";

export let sendMessage = (messageID, chatID, sender, text) => ({
  type: SEND_MSG,
  messageID: messageID,
  chatID: chatID,
  sender: sender,
  text: text
});