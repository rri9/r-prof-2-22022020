import update from 'immutability-helper';

import { ADD_CHAT } from '../actions/chats_action.js';

const initialStore = {
   chats: {
      1: { 
         title: 'Chat 1',
      },
      2: { 
         title: 'Chat 2',
      },
   }
};

export default function chatReducer( store = initialStore, action ) {
   switch ( action.type ) {
      case ADD_CHAT: {
         return update(store, {
            chats: {
               $merge: {
                  [action.chatId]: { 
                     title: action.title
                  }
               }
            }
         });
      }
      default:
         return store;
   }
}