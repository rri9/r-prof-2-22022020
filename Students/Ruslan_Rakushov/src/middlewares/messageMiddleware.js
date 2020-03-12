import { SEND_MESSAGE } from '../store/actions/messageActions';

export default store => next => (action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      console.log('middleware is working!');
      
      break;
  
  }
  return next(action);
};