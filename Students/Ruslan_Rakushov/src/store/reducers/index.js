import { combineReducers } from 'redux';
import messageReducer from './messageReducer.js';
import chatReducer from './chatReducer.js';

export default combineReducers({
  messageReducer,
  chatReducer,
});