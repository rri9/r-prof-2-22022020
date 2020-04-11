import { RSAA, getJSON } from "redux-api-middleware";

export const CHATS_LOADING_START = '@@chat/CHATS_LOADING_START';
export const CHATS_LOADING_SUCCESS = '@@chat/CHATS_LOADING_SUCCESS';
export const CHATS_LOADING_ERROR = '@@chat/CHATS_LOADING_ERROR';

export const CHAT_ADD_START = '@@chat/CHAT_ADD_START';
export const CHAT_ADD_SUCCESS = '@@chat/CHAT_ADD_SUCCESS';
export const CHAT_ADD_ERROR = '@@chat/CHAT_ADD_ERROR';

export const CHAT_DEL_START = '@@chat/CHAT_DEL_START';
export const CHAT_DEL_SUCCESS = '@@chat/CHAT_DEL_SUCCESS';
export const CHAT_DEL_ERROR = '@@chat/CHAT_DEL_ERROR';

export const CHAT_BLINK = '@@chat/CHAT_BLINK';
export const CHAT_SET_CURRENT = '@@chat/CHAT_SET_CURRENT';

// export const addChat = (title, email) => ({
//   [RSAA]: {
//     endpoint: '/api/chat',
//     method: 'POST',
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': '',
//     },
//     body: JSON.stringify({
//       email: email,
//       chat: {
//         title: title,
//       },
//     }),
//     types: [
//       CHAT_ADD_START,
//       {
//         type: CHAT_ADD_SUCCESS,
//         payload: (action, state, res) => {
//           return getJSON(res).then(json => json);
//         },
//       },
//       {
//         type: CHAT_ADD_ERROR,
//         payload: (action, state, res) => {
//           return getJSON(res).then(json => json);
//         },
//       },
//     ],
//   },
// });

// export const delChat = (chatId, email) => ({
//   [RSAA]: {
//     endpoint: `/api/chat/${chatId}`,
//     method: 'DELETE',
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': '',
//     },
//     body: JSON.stringify({
//       email: email,
//     }),
//     types: [
//       CHAT_DEL_START,
//       {
//         type: CHAT_DEL_SUCCESS,
//         payload: (action, state, res) => {
//           return getJSON(res).then(json => json);
//         },
//       },
//       {
//         type: CHAT_DEL_ERROR,
//         payload: (action, state, res) => {
//           return getJSON(res).then(json => json);
//         },
//       },
//     ],
//   },
// });

// export const blinkChat = (chatId) => ({
//   type: CHAT_BLINK,
//   chatId,
// });

// export const setCurrentChatId = (chatId) => ({
//   type: CHAT_SET_CURRENT,
//   chatId,
// });

export const loadChats = (email) => ({
  [RSAA]: {
    endpoint: '/api/chats',
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '',
    },
    body: JSON.stringify({
      email: email
    }),
    types: [
      CHATS_LOADING_START,
      {
        type: CHATS_LOADING_SUCCESS,
        payload: (action, state, res) => {
          return getJSON(res).then(json => json);
        },
      },
      {
        type: CHATS_LOADING_ERROR,
        payload: (action, state, res) => {
          return getJSON(res).then(json => json);
        },
      },
    ],
  },
});
