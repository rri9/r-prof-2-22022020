import update from 'immutability-helper';

import { 
   ADD_CHAT,
   START_CHATS_LOADING,
   SUCCESS_CHATS_LOADING,
   ERROR_CHATS_LOADING,
} from '../actions/chats_action.js';

const initialStore = {
   chats: [],
   isLoading: false,
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
      case START_CHATS_LOADING: { 
         return update(store, { 
            isLoading: { $set: true }, 
         }); 
     } 
     case SUCCESS_CHATS_LOADING: { 
         const chats = []; 
         action.payload.forEach( chat => { 
             chats.push( { title: chat.title, chatId: chat.chatId } ); 
         }); 
         return update(store, { 
             chats: { $set: chats }, 
             isLoading: { $set: false }, 
         }); 
     } 
     case ERROR_CHATS_LOADING: { 
         return update(store, { 
             isLoading: { $set: false }, 
         }); 
     } 
      default:
         return store;
   }
}