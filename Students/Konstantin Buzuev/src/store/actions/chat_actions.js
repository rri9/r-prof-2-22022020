import {
  RSAA,
  getJSON
} from 'redux-api-middleware';
// Начальная загрузка сообщений
export const START_MESSAGES_LOADING = '@@chat/START_MESSAGES_LOADING';
export const SUCCESS_MESSAGES_LOADING = '@@chat/SUCCESS_MESSAGES_LOADING';
export const ERROR_MESSAGES_LOADING = '@@chat/ERROR_MESSAGES_LOADING';
export const loadMessages = () => ({
  [RSAA]: {
    // endpoint: '/staticapi/messages.json',
    endpoint: '/api/messages',
    method: 'GET',
    types: [
      START_MESSAGES_LOADING,
      {
        type: SUCCESS_MESSAGES_LOADING,
        payload: (action, state, res) => getJSON(res).then(json => {
          json.forEach(message => {
            if (!!message._id) { // Загружаем сообщения из mongo, а не из staticapi
              message.user = message.sender // Парсим из-за различия в реализации фронта и бэка
              delete message.sender
              message.chatID = Number(message.chatId)
              delete message.chatId
              message.messageID = Number(message.messageId)
              delete message.Id
            }
          })
          return json
        }),
      },
      ERROR_MESSAGES_LOADING,
    ],
  },
});

export const START_MESSAGE_SEND = '@@chat/START_MESSAGE_SEND';
export const SUCCESS_MESSAGE_SEND = '@@chat/SUCCESS_MESSAGE_SEND';
export const ERROR_MESSAGES_SEND = '@@chat/ERROR_MESSAGES_SEND';

export let SEND_MESSAGE = "@@chat/SEND_MESSAGE";

export let sendMessage = (messageID, chatID, sender, text) => ({
  [RSAA]: {
    // endpoint: '/staticapi/messages.json',
    endpoint: '/api/message',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: () => {
      let a = JSON.stringify({
        chatId: chatID,
        sender: sender,
        text: text
      })
      return a;
    },
    types: [
      START_MESSAGE_SEND,
      {
        type: SUCCESS_MESSAGE_SEND,
        payload: (action, state, res) => getJSON(res).then(json => {
          if (!!json._id) { // Загружаем сообщения из mongo, а не из staticapi
            json.user = json.sender // Парсим из-за различия в реализации фронта и бэка
            delete json.sender
            json.chatID = Number(json.chatId)
            delete json.chatId
            json.messageID = Number(json.messageId)
            delete json.Id
          }
          return json
        })

      },
      ERROR_MESSAGES_SEND,
    ],
  },
});















//   ({
//   type: SEND_MESSAGE,
//   messageID: messageID,
//   chatID: chatID,
//   sender: sender,
//   text: text
// });