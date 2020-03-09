import update from 'immutability-helper';
import { SEND_MESSAGE } from '../actions/messageActions.js';

const initialStore = {
  msgs: {
    1: {
      sender: 'Me',
      text: 'Hello!',
    },
    2: {
      sender: null,
      text: null,
    },
    3: {
      sender: 'Me',
      text: 'How are You?',
    },
    4: {
      sender: null,
      text: null,
    },
    5: {
      sender: null,
      text: 'Hello, human!',
    }
  }
};

export default function messageReducer(store = initialStore, action) {
  switch (action.type) {
    case SEND_MESSAGE:
      return update(store, {
        msgs: { $merge: {
            [action.msgId]: { sender: action.sender, text: action.text }
        }}
      });
  
    default:
      return store;
  }
}