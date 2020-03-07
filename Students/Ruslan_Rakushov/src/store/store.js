import { createStore } from 'redux';
import initReducers from './reducers/index.js';

function initStore() {
  const initialStore = {};

  return createStore(
    initReducers,
    initialStore,
  );
}

export default initStore;