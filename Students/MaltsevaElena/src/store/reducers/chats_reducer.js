import update from 'react-addons-update'
//import ACTIONS
import { ADD_CHAT } from '../actions/chats_action.js'

const initialStore = {
   chatRooms: {
      1: { title: "HelpDesk" },
      2: { title: "Darth Vader" },
      3: { title: "Typical JS" },
   }
}

export default function chatReducer (store = initialStore, action) {
   switch (action.type) {
      case ADD_CHAT: {
         return update(store, {
            chatRooms: {
               $merge: { [action.chatId]: { title: action.title } }
            }
         })
      }
      default:
         return store
   }
}