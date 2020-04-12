import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import chatReducers from './chatReducers.js';
import userReducers from './userReducers.js';

export default (history) => combineReducers({
  router: connectRouter(history),
  chatReducers,
  userReducers,
});
