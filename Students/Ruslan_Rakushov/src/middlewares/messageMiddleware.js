import { SEND_MESSAGE, sendMessage } from '../store/actions/messageActions';

export default store => next => (action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      if (action.sender === 'Me') {
        setTimeout(() => {
          const msgId = Object.keys(store.getState().messageReducer.msgs).length + 1;
          const text = 'Leave me alone, human...';
          const sender = 'Bot';
          store.dispatch(sendMessage(msgId, sender, text, action.chatId));
        }, 1000);
      }
      break;
  }
  return next(action);
};