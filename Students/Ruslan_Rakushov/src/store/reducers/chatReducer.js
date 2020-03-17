import update from 'immutability-helper';
import {
  ADD_MESSAGE_COUNT, ADD_CHAT, BLINK_CHAT, DEL_CHAT, SET_CURRENT_CHAT
} from '../actions/chatActions.js';

const initialStore = {
  chats: {
    1: { title: 'Chat 1' },
    2: { title: 'Chat 2' },
    3: { title: 'Chat 3' },
  },
  chatWithNewMsg: null,
  currentChatId: 1,
};

export default function chatReducer(store = initialStore, action) {
  switch (action.type) {
    //-------------------
    case ADD_CHAT:
      const newId = +Object.keys(store.chats)[Object.keys(store.chats).length-1] + 1;
      return update(store, {
        chats: {
          [newId]: {$set: {title: action.title, msgsCount: 0}}
        },
        currentChatId: {$set: newId},
      });
    //-------------------
    case ADD_MESSAGE_COUNT:
      return update(store, {
        chats: {
          [action.chatId]: {$merge: {
              msgsCount: store.chats[action.chatId].msgsCount+1,
          }}
        }
      });
    //-------------------
    case BLINK_CHAT:
      return update(store, {
        chatWithNewMsg: {$set: action.chatId}
      });
    //-------------------
    case DEL_CHAT:
      const existChatsId = Object.keys(store.chats).map((i) => +i);
      if(existChatsId.length === 1) return null;
      
      let newCurrentChatId;
      for(let i=0; i<existChatsId.length; i++) {
        if(existChatsId[i]!==action.chatId) {
          newCurrentChatId = existChatsId[i];
          break;
        }
      }
      
      return update(store, {
        chats: {
          $unset: [action.chatId]
        },
        currentChatId: {$set: newCurrentChatId},
      });
    //-------------------
    case SET_CURRENT_CHAT:
      return update(store, {
        currentChatId: {$set: action.chatId}
      });
    //-------------------
    
    default:
      return store;
  }
}