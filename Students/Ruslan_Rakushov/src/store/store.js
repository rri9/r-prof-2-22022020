import { createStore } from 'redux';
import initReducers from './reducers/index.js';

function initStore() {
  const initialStore = {};

  return createStore(
    initReducers,
    initialStore,

    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : () => {},
  );
}

export default initStore;