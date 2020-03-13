export let SEND_MSG = "@@chat/SEND_MSG";

export let sendMessage = (chatID, messageID, sender, text) => ({
  type: SEND_MSG,
  chatID: chatID,
  messageID: messageID,
  sender: sender,
  text: text
});