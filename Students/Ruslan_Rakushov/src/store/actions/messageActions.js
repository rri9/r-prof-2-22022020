export const MESSAGE_ADD_START = '@@message/MESSAGE_ADD_START';
export const MESSAGE_ADD_SUCCESS = '@@message/MESSAGE_ADD_SUCCESS';
export const MESSAGE_ADD_ERROR = '@@message/MESSAGE_ADD_ERROR';

export const MESSAGE_DEL_START = '@@message/MESSAGE_DEL_START';
export const MESSAGE_DEL_SUCCESS = '@@message/MESSAGE_DEL_SUCCESS';
export const MESSAGE_DEL_ERROR = '@@message/MESSAGE_DEL_ERROR';

export const SEARCH_TEXT_SET = '@@message/SEARCH_TEXT_SET';

export const sendMessage = (message, senderId, sender, currentChatId, token) => {
  return async (dispatch) => {
    dispatch(sendMessageStart());

    const response = await fetch('/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        chatId: currentChatId,
        message: {
          senderId,
          sender,
          text: message
        }
      }),
    });

    const result = await response.json();

    if (response.status === 200) {
      dispatch(sendMessageSuccess(result.messageId, message, senderId, sender, currentChatId));
    } else {
      dispatch(sendMessageError(result.error));
      if (result.error.startsWith('Authorization error')) {
        dispatch(push('/'));
      }
    }
  };
};

export const sendMessageStart = () => ({
  type: MESSAGE_ADD_START,
});

export const sendMessageSuccess = (messageId, message, senderId, sender, currentChatId) => ({
  type: MESSAGE_ADD_SUCCESS,
  payload: {messageId, message, senderId, sender, currentChatId}
});

export const sendMessageError = (error) => ({
  type: MESSAGE_ADD_ERROR,
  payload: error
});
//---------------------------------
export const delMessage = (messageId, currentChatId, token) => {
  return async (dispatch) => {
    dispatch(delMessageStart());

    const response = await fetch('/api/message', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        chatId: currentChatId,
        messageId: messageId
      }),
    });

    const result = await response.json();

    if (response.status === 200) {
      dispatch(delMessageSuccess(messageId, currentChatId)); //TODO result.message
    } else {
      dispatch(delMessageError(result.error));
      if (result.error.startsWith('Authorization error')) {
        dispatch(push('/'));
      }
    }
  };
};
export const delMessageStart = () => ({
  type: MESSAGE_DEL_START,
});
export const delMessageSuccess = (messageId, currentChatId) => ({
  type: MESSAGE_DEL_SUCCESS,
  payload: { messageId, currentChatId }
});
export const delMessageError = (error) => ({
  type: MESSAGE_DEL_ERROR,
  payload: error
});

//---------------------------------

export const setSearchText = (str) => ({
  type: SEARCH_TEXT_SET,
  str
})