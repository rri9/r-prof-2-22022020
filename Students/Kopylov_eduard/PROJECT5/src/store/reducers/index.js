import { combineReducers } from 'redux';
import msgReducer from './messages_reducer.js';
import chatReducer from './chat_reducer.js'

export default combineReducers({ msgReducer, chatReducer })