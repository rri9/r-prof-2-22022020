import { SEND_MSG, sendMessage } from '../store/actions/messages_action.js'

export default store => next => (action) => {
   switch (action.type) {
      case SEND_MSG:
         if (action.sender === 'Me') {
            setTimeout(() => store.dispatch(
               sendMessage(
                  action.chatId,
                  Object.keys(store.getState().msgReducer.messages[action.chatId]).length + 1,
                  null,
                  "We'll call you back",
               )
            ), 1000)
         }
   }
   return next(action)
}