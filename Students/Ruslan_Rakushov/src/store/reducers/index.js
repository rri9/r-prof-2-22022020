import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import chatReducers from './chatReducers.js'

export default (history) => combineReducers({
  router: connectRouter(history),
  chatReducers,
});
