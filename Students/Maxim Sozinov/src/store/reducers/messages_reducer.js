import update from 'immutability-helper';

import { SEND_MSG } from '../actions/messages_actions.js';

const initialStore = {
   messages: {
      1: {
         user: 'Darth Vader',
         text: 'Hallo',
         chatId: 1
      },
      2: {
         user: null,
         text: 'Go away!',
         chatId: 1
      },
      3: {
         user: 'Darth Vader',
         text: 'I am your father',
         chatId: 1
      },
      4: {
         user: null,
         text: 'NOOOOOOOOO',
         chatId: 1
      },
      5: {
         user: 'Darth Vader',
         text: 'Hello, world!',
         chatId: 2
      },
      6: {
         user: null,
         text: 'Who is here?!!',
         chatId: 2
      },
   },
};

export default function msgReducer(store = initialStore, action) {
   switch (action.type) {
      case SEND_MSG: {
         return update(store, {
            messages: {
               $merge: {
                  [action.messageId]: {
                     user: action.sender,
                     text: action.text,
                     chatId: action.chatId
                  }
               }
            }
         });
      }
      default:
         return store;
   }
}