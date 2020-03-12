import update from 'immutability-helper';
import { ADD_MESSAGE_COUNT, ADD_CHAT, BLINK_CHAT } from '../actions/chatActions.js';

const initialStore = {
  chats: {
    1: { title: 'Chat 1', msgsCount: 4 },
    2: { title: 'Chat 2', msgsCount: 1 },
    3: { title: 'Chat 3', msgsCount: 0 },
  },
  chatWithNewMsg: null,
};

export default function chatReducer(store = initialStore, action) {
  switch (action.type) {
    case ADD_CHAT:
      const newId = Object.keys(store.chats).length + 1;
      return update(store, {
        chats: {
          [newId]: {$set: {title: action.title, msgsCount: 0}}
        }
      });
    case ADD_MESSAGE_COUNT:
      return update(store, {
        chats: {
          [action.chatId]: {$merge: {
              msgsCount: store.chats[action.chatId].msgsCount+1,
          }}
        }
      });
    case BLINK_CHAT:
      return update(store, {
        chatWithNewMsg: {$set: action.chatId}
      });

    default:
      return store;
  }
}