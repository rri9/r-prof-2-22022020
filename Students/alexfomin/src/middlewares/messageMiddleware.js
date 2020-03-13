import { SEND_MSG } from "../store/actions/messages_actions.js";

export default store => next => (action) => {
   switch (action.type) {
       case SEND_MSG:
           if (action.sender === 'me') {
               console.log('Надо бы ответить')
           }
   }
   return next(action)
}
