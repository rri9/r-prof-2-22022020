import update from 'immutability-helper';
import {
  ADD_CHAT, BLINK_CHAT, DEL_CHAT, SET_CURRENT_CHAT,
  START_CHATS_LOADING, SUCCESS_CHATS_LOADING, ERROR_CHATS_LOADING,
} from '../actions/chatActions.js';

const initialStore = {
  chats: {
  },
  chatWithNewMsg: null,
  currentChatId: 1,
  isLoading: false,
};

export default function chatReducer(store = initialStore, action) {
  switch (action.type) {
    //-------------------
    case ADD_CHAT:
      let newId = 1;
      if (Object.keys(store.chats).length) {
        newId = +Object.keys(store.chats)[Object.keys(store.chats).length-1] + 1;
      };
      return update(store, {
        chats: {
          [newId]: {$set: {title: action.title, msgsCount: 0}}
        },
        currentChatId: {$set: newId},
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
    case START_CHATS_LOADING:
      return update(store, {
        isLoading: { $set: true }
      });
    //-------------------
    case SUCCESS_CHATS_LOADING:
      return update(store, {
        chats: { $set: action.payload.chats },
        currentChatId: { $set: action.payload.currentChatId },
        isLoading: { $set: false }
      });
    //-------------------
    case ERROR_CHATS_LOADING:
      return update(store, {
        isLoading: { $set: false }
      });
    //-------------------
    default:
      return store;
  }
}