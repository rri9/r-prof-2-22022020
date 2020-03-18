import { SEND_MSG, sendMessage } from '../store/actions/messages_actions.js';

export default store => next => (action) => {
   switch (action.type) {
      case SEND_MSG: {
         if ( action.sender === store.getState().userReducer.user ) {
            const messageId = action.messageId + 1;
            setTimeout(() => store.dispatch ( sendMessage ( 
                  messageId, 
                  null,
                  'NOOOOOOOOOO...',
                  action.chatId))
            , 500);
         } 
      }

   }
   return next (action);
};