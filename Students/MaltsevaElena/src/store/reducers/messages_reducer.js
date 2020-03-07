import update from 'react-addons-update'
//import ACTIONS
import { SEND_MSG } from '../actions/messages_action.js'

const initialStore = {
   messages: {
      1: { user: null, text: "Any problems?" },
      2: { user: "Me", text: "I clicked something and everything disappeared" },
      3: { user: null, text: null },
      4: { user: "Me", text: "And what?" },
   }
}

export default function msgReducer (store = initialStore, action) {
   switch (action.type) {
      case SEND_MSG: {
         // console.log(store.messages)
         return update(store, {
            messages: { $merge: { [action.messageId]: { user: action.sender, text: action.text} } }
         })
      }
      default:
         return store
   }
}