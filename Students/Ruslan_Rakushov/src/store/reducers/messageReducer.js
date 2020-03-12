import update from 'immutability-helper';
import { SEND_MESSAGE } from '../actions/messageActions.js';

const initialStore = {
  msgs: {
    1: {
      sender: 'Me',
      text: 'Hello!',
      chatId: 1,
    },
    2: {
      sender: null,
      text: null,
      chatId: 1,
    },
    3: {
      sender: 'Me',
      text: 'How are You?',
      chatId: 1,
    },
    4: {
      sender: null,
      text: null,
      chatId: 1,
    },
    5: {
      sender: null,
      text: 'Hello, human!',
      chatId: 2,
    }
  }
};

export default function messageReducer(store = initialStore, action) {
  switch (action.type) {
    case SEND_MESSAGE:
      return update(store, {
        msgs: { $merge: {
            [action.msgId]: { sender: action.sender, text: action.text, chatId: action.chatId }
        }}
      });
  
    default:
      return store;
  }
}