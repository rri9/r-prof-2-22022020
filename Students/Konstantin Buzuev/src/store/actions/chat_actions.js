import {
  RSAA,
  getJSON
} from 'redux-api-middleware';

export const START_MESSAGES_LOADING = '@@chat/START_MESSAGES_LOADING';
export const SUCCESS_MESSAGES_LOADING = '@@chat/SUCCESS_MESSAGES_LOADING';
export const ERROR_MESSAGES_LOADING = '@@chat/ERROR_MESSAGES_LOADING';

export const loadMessages = () => ({
  [RSAA]: {
    endpoint: '/staticapi/messages.json',
    method: 'GET',
    types: [
      START_MESSAGES_LOADING,
      {
        type: SUCCESS_MESSAGES_LOADING,
        payload: (action, state, res) => getJSON(res).then(
          json => json,
        ),
      },
      ERROR_MESSAGES_LOADING,
    ],
  },
});


export let SEND_MSG = "@@chat/SEND_MSG";

export let sendMessage = (messageID, chatID, sender, text) => ({
  type: SEND_MSG,
  messageID: messageID,
  chatID: chatID,
  sender: sender,
  text: text
});