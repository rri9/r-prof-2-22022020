import update from 'react-addons-update'
//import ACTIONS
import { SEND_MSG, NEW_CHAT } from '../actions/messages_action.js'

const initialStore = {
   messages: {
      1: {
         1: { user: "HelpDesk", text: "Any problems?" },
         2: { user: "Me", text: "I clicked something and everything disappeared" },
         3: { user: "HelpDesk", text: "Trolololo" },
         4: { user: "Me", text: "Very useful answer" },
      },
      2: {
         1: { user: "Darth Vader", text: "Luke, I'm your father!" },
      },
      3: {
         1: { user: "Typical JS", text: "'5' + 3 = '53'" },
         2: { user: "Me", text: "Whaaat?"}
      }
   }
}

export default function msgReducer (store = initialStore, action) {
   switch (action.type) {
      case SEND_MSG: {
         return update(store, {
            messages: { [action.chatId]: { 
               $merge: { [action.messageId]: { user: action.sender, text: action.text } } 
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
      default:
         return store
   }
}