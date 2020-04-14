export const MESSAGE_ADD_START = '@@message/MESSAGE_ADD_START';
export const MESSAGE_ADD_SUCCESS = '@@message/MESSAGE_ADD_SUCCESS';
export const MESSAGE_ADD_ERROR = '@@message/MESSAGE_ADD_ERROR';

// export const MESSAGE_DEL_START = '@@message/MESSAGE_DEL_START';
// export const MESSAGE_DEL_SUCCESS = '@@message/MESSAGE_DEL_SUCCESS';
// export const MESSAGE_DEL_ERROR = '@@message/MESSAGE_DEL_ERROR';

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
