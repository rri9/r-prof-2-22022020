import update from 'immutability-helper';
import { ADD_MESSAGE_COUNT } from '../actions/chatActions.js';

const initialStore = {
  chats: {
    1: { title: 'Чат 1', msgsCount: 4 },
    2: { title: 'Чат 2', msgsCount: 1 },
    3: { title: 'Чат 3', msgsCount: 0 },
  }
};

export default function chatReducer(store = initialStore, action) {
  switch (action.type) {
    // case ADD_CHAT:
    //   return update(store, {
    //     msgs: { $merge: {
    //         [action.msgId]: { sender: action.sender, text: action.text }
    //     }}
    //   });
    case ADD_MESSAGE_COUNT:
      return update(store, {
        chats: {
          [action.chatId]: {$merge: {
              msgsCount: store.chats[action.chatId].msgsCount+1,
          }}
        }
      });
  
    default:
      return store;
  }
}