import { combineReducers } from 'redux'
import msgReducer from './messages_reducer.js'
import chatsReducer from './chats_reducer.js'

export default combineReducers({ msgReducer, chatsReducer })