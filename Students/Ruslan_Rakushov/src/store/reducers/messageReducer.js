import update from 'immutability-helper';
import {
  SEND_MESSAGE, DEL_MESSAGE, SET_SEARCH_TEXT,
  START_MESSAGES_LOADING, SUCCESS_MESSAGES_LOADING, ERROR_MESSAGES_LOADING,
} from '../actions/messageActions.js';

const initialStore = {
  msgs: {
  },
  isLoading: false,
  searchText: '',
};

export default function messageReducer(store = initialStore, action) {
  switch (action.type) {
    case SEND_MESSAGE:
      let newId = 1;
      if (Object.keys(store.msgs).length) {
        newId = +Object.keys(store.msgs)[Object.keys(store.msgs).length - 1] + 1;
      }
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
    
    case START_MESSAGES_LOADING:
      return update(store, {
        isLoading: { $set: true }
      });
    
    case SUCCESS_MESSAGES_LOADING:
      return update(store, {
        msgs: { $set: action.payload.msgs },
        isLoading: { $set: false }
      });
    
    case ERROR_MESSAGES_LOADING:
      return update(store, {
        isLoading: { $set: false }
      });
  
    default:
      return store;
  }
}