import { push } from "connected-react-router";

export const CHATS_LOADING_START = '@@chat/CHATS_LOADING_START';
export const CHATS_LOADING_SUCCESS = '@@chat/CHATS_LOADING_SUCCESS';
export const CHATS_LOADING_ERROR = '@@chat/CHATS_LOADING_ERROR';

export const CHAT_ADD_START = '@@chat/CHAT_ADD_START';
export const CHAT_ADD_SUCCESS = '@@chat/CHAT_ADD_SUCCESS';
export const CHAT_ADD_ERROR = '@@chat/CHAT_ADD_ERROR';

// export const CHAT_DEL_START = '@@chat/CHAT_DEL_START';
// export const CHAT_DEL_SUCCESS = '@@chat/CHAT_DEL_SUCCESS';
// export const CHAT_DEL_ERROR = '@@chat/CHAT_DEL_ERROR';

// export const CHAT_BLINK = '@@chat/CHAT_BLINK';
export const CHAT_SET_CURRENT = '@@chat/CHAT_SET_CURRENT';

// export const delChat = (chatId, email) => ({
//   [RSAA]: {
//     endpoint: `/api/chat/${chatId}`,
//     method: 'DELETE',
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': '',
//     },
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

export const setCurrentChatId = (chatId) => ({
  type: CHAT_SET_CURRENT,
  chatId,
});

export const loadChats = (token) => {
  return async (dispatch) => {
    dispatch(loadChatsStart());

    const response = await fetch('/api/chats', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (response.status === 200) {
      dispatch(loadChatsSuccess(result));
    } else {
      dispatch(loadChatsError(result.error));
      if (result.error.startsWith('Authorization error')) {
        dispatch(push('/'));
      }
    }
  };
};

export const loadChatsStart = () => ({
  type: CHATS_LOADING_START,
});
export const loadChatsSuccess = (chats) => ({
  type: CHATS_LOADING_SUCCESS,
  payload: chats
});
export const loadChatsError = (error) => ({
  type: CHATS_LOADING_ERROR,
  payload: error
});
//------------------------------------------------------------
export const addChat = (title, token) => {
  return async (dispatch) => {
    dispatch(addChatStart());

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        chat: {
          title: title
        },
      }),
    });

    const result = await response.json();

    if (response.status === 201) {
      dispatch(addChatSuccess(result.chatId, title));
      // dispatch(push(`/chat/${result.chatId}/`));
      dispatch(setCurrentChatId(result.chatId));
    } else {
      dispatch(addChatError(result.error));
      if (result.error.startsWith('Authorization error')) {
        dispatch(push('/'));
      }
    }
  };
};

export const addChatStart = () => ({
  type: CHAT_ADD_START,
});
export const addChatSuccess = (chatId, title) => ({
  type: CHAT_ADD_SUCCESS,
  payload: { chatId, title }
});
export const addChatError = (error) => ({
  type: CHAT_ADD_ERROR,
  payload: error
});
