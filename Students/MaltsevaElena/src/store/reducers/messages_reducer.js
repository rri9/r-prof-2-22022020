import update from 'react-addons-update'

import { SUCCESS_MESSAGES_LOADING,
         SUCCESS_MESSAGE_SENDING } from '../actions/messages_action.js'

const initialStore = {
   messages: {},
}

export default function msgReducer (store = initialStore, action) {
   switch (action.type) {
      case SUCCESS_MESSAGES_LOADING: {
         const messages = {}
         action.payload.forEach(msg => {
            const { _id, sender, text, chatId } = msg
            messages[_id] = { sender, text, chatId }
         })
         return update(store, {
            messages: { $set: messages }
         })
      }
      case SUCCESS_MESSAGE_SENDING: {
         const { _id, sender, text, chatId } = action.payload
         return update(store, {
            messages: { 
               $merge: { [_id]: { sender, text, chatId } } 
            }
         })
      }
      default:
         return store
   }
}