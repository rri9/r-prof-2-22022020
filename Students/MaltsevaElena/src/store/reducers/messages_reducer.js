import update from 'react-addons-update'
//import ACTIONS
import { SEND_MSG } from '../actions/messages_action.js'

const initialStore = {
   messages: {
      1: {
         1: { user: null, text: "Any problems?" },
         2: { user: "Me", text: "I clicked something and everything disappeared" },
         3: { user: null, text: null },
         4: { user: "Me", text: "Anybody here?" },
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
         // console.log(store.messages)
         return update(store, {
            messages: { [action.chatId]: { $merge: { [action.messageId]: { user: action.sender, text: action.text} } } }
         })
      }
      default:
         return store
   }
}