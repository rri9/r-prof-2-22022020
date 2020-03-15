import update from 'react-addons-update'
//import ACTIONS
import { SEND_MSG, NEW_CHAT } from '../actions/messages_action.js'
import { DEL_CHAT } from '../actions/chats_action.js'


const initialStore = {
   messages: {
      1: {
         1: { user: "HelpDesk", text: "Any problems?", chatId: 1 },
         2: { user: "Me", text: "I clicked something and everything disappeared", chatId: 1 },
         3: { user: "HelpDesk", text: "Trolololo", chatId: 1 },
         4: { user: "Me", text: "Very useful answer", chatId: 1 },
      },
      2: {
         1: { user: "Darth Vader", text: "Luke, I'm your father!", chatId: 2 },
      },
      3: {
         1: { user: "Typical JS", text: "'5' + 3 = '53'", chatId: 3 },
         2: { user: "Me", text: "Whaaat?", chatId: 3 }
      }
   }
}

export default function msgReducer (store = initialStore, action) {
   switch (action.type) {
      case SEND_MSG: {
         return update(store, {
            messages: { [action.chatId]: { 
               $merge: { [action.messageId]: { user: action.sender, text: action.text, chatId: action.chatId } } 
            }}
         })
      }
      case NEW_CHAT: {
         return update(store, {
            messages: {
               $merge: { [action.chatId]: {  } }
            }
         })
      }
      case DEL_CHAT: {
         return update(store, {
            messages: {
               [action.chatId]: { $set: undefined }
            }
         })
      }
      default:
         return store
   }
}