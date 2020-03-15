import { combineReducers } from 'redux';
import messageReducer from './messageReducer.js';
import chatReducer from './chatReducer.js';
import { connectRouter } from 'connected-react-router';

export default (history) => combineReducers({
  router: connectRouter(history),
  messageReducer,
  chatReducer,
});