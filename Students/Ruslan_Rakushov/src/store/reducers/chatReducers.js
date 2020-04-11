import update from 'immutability-helper';
import {
  CHATS_LOADING_START, CHATS_LOADING_SUCCESS, CHATS_LOADING_ERROR,
  CHAT_ADD_START, CHAT_ADD_SUCCESS, CHAT_ADD_ERROR,
  CHAT_DEL_START, CHAT_DEL_SUCCESS, CHAT_DEL_ERROR,
  CHAT_BLINK,
  CHAT_SET_CURRENT,
} from '../actions/chatActions.js';

const initialStore = {
  chats: [],
  // chatWithNewMsg: null,
  currentChatId: undefined,
  isLoading: false,
  chatsLoadingError: '',
};

export default function chatReducers(store = initialStore, action) {
  switch (action.type) {
    //-------------------
    // case ADD_CHAT:
    //   let newId = action.chatId;
    //   if (!newId) break;
    //   return update(store, {
    //     chats: { $push: [
    //       { _id: newId, title: action.title },
    //     ]},
    //     currentChatId: { $set: newId },
    //   });
    //-------------------
    // case BLINK_CHAT:
    //   return update(store, {
    //     chatWithNewMsg: {$set: action.chatId}
    //   });
    //-------------------
    // case DEL_CHAT:
    //   if (action.result !== 1) break;
      
    //   let newCurrentChatId = null;
    //   for (let i = 0; i < store.chats.length; i++) {
    //     if (store.chats[i]._id !== action.chatId) {
    //       newCurrentChatId = store.chats[i]._id
    //       break;
    //     }
    //   }
    //   const index = store.chats.findIndex(chat => (chat._id === action.chatId));
      
    //   if (newCurrentChatId) {
    //     return update(store, {
    //       chats: { $splice: [[index, 1]] },
    //       currentChatId: { $set: newCurrentChatId },
    //     });
    //   } else {
    //     return update(store, {
    //       chats: { $splice: [[index, 1]] },
    //       currentChatId: { $set: '' },
    //     });
    //   }
    //-------------------
    // case SET_CURRENT_CHAT:
    //   return update(store, {
    //     currentChatId: {$set: action.chatId}
    //   });
    //-------------------
    case CHATS_LOADING_START:
      return update(store, {
        isLoading: { $set: true }
      });
    //-------------------
    case CHATS_LOADING_SUCCESS:
      const currentChatId = action.payload.length ? action.payload[0]._id : undefined;
      if (currentChatId) {
        return update(store, {
          chats: { $set: action.payload },
          currentChatId: {$set: currentChatId},
          isLoading: { $set: false },
          chatsLoadingError: { $set: '' },
        });
      } else {
        return update(store, {
          isLoading: { $set: false },
          chatsLoadingError: { $set: 'No chats loaded' },
        });
      }
    //-------------------
    case CHATS_LOADING_ERROR:
      console.log('ERROR_CHATS_LOADING payload:', action.payload)
      return update(store, {
        isLoading: { $set: false },
        chatsLoadingError: { $set: action.payload.toString() },
      });
    //-------------------
    default:
      return store;
  }
}
