import update from 'immutability-helper';
import { SEND_MESSAGE, DEL_MESSAGE, SET_SEARCH_TEXT } from '../actions/messageActions.js';

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
  },
  searchText: '',
};

export default function messageReducer(store = initialStore, action) {
  switch (action.type) {
    case SEND_MESSAGE:
      const newId = +Object.keys(store.msgs)[Object.keys(store.msgs).length-1] + 1;
      return update(store, {
        msgs: { $merge: {
            [newId]: { sender: action.sender, text: action.text, chatId: action.chatId }
        }}
      });

    case DEL_MESSAGE:
      return update(store, {
        msgs: { $unset: [action.msgId] }
      });
    
    case SET_SEARCH_TEXT:
      return update(store, {
        searchText: { $set: [action.str] }
      });
  
    default:
      return store;
  }
}