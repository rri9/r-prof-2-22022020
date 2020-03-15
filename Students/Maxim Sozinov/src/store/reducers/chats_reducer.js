import update from 'immutability-helper';

import { ADD_CHAT } from '../actions/chats_action.js';

const initialStore = {
   chats: [],
};

export default function chatReducer( store = initialStore, action ) {
   switch ( action.type ) {
      case ADD_CHAT: {
         return update(store, {
            chats: {
               $push: [{
                   title: action.title,
                   chatId: action.chatId,
               }]
            }
         });
      }
      default:
         return store;
   }
}