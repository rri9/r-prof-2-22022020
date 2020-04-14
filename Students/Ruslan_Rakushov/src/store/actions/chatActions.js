import { push } from "connected-react-router";

export const CHATS_LOADING_START = '@@chat/CHATS_LOADING_START';
export const CHATS_LOADING_SUCCESS = '@@chat/CHATS_LOADING_SUCCESS';
export const CHATS_LOADING_ERROR = '@@chat/CHATS_LOADING_ERROR';

export const CHAT_ADD_START = '@@chat/CHAT_ADD_START';
export const CHAT_ADD_SUCCESS = '@@chat/CHAT_ADD_SUCCESS';
export const CHAT_ADD_ERROR = '@@chat/CHAT_ADD_ERROR';

export const CHAT_DEL_START = '@@chat/CHAT_DEL_START';
export const CHAT_DEL_SUCCESS = '@@chat/CHAT_DEL_SUCCESS';
export const CHAT_DEL_ERROR = '@@chat/CHAT_DEL_ERROR';

export const CHAT_BLINK_START = '@@chat/CHAT_BLINK_START';
export const CHAT_BLINK_END = '@@chat/CHAT_BLINK_END';

export const CHAT_SET_CURRENT = '@@chat/CHAT_SET_CURRENT';

//------------------------------------------------------------

export const setCurrentChatId = (chatId) => ({
  type: CHAT_SET_CURRENT,
  chatId,
});

//------------------------------------------------------------

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

//------------------------------------------------------------

export const delChat = (id, token) => {
  return async (dispatch) => {
    dispatch(delChatStart());

    const response = await fetch(`/api/chat/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (response.status === 200) {
      dispatch(delChatSuccess(id, result.message));
      dispatch(setCurrentChatId(''));
    } else {
      dispatch(delChatError(result.error));
      if (result.error.startsWith('Authorization error')) {
        dispatch(push('/'));
      }
    }
  };
};
export const delChatStart = () => ({
  type: CHAT_DEL_START,
});
export const delChatSuccess = (id, message) => ({
  type: CHAT_DEL_SUCCESS,
  payload: { id, message }
});
export const delChatError = (error) => ({
  type: CHAT_DEL_ERROR,
  payload: error
});

//------------------------------------------------------------

export const blinkChat = (id) => {
  return (dispatch) => {
    dispatch(blinkChatStart(id));
    setTimeout(() => {
      dispatch(blinkChatEnd(id));
    }, 3000);
  }
}
export const blinkChatStart = (id) => ({
  type: CHAT_BLINK_START,
  payload: id
});
export const blinkChatEnd = (id) => ({
  type: CHAT_BLINK_END,
  payload: id
});