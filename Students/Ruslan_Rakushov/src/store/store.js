import { createStore, compose, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import initReducers from './reducers/index.js';
import middlewares from './middlewares/index.js';

const rootPersistConfig = {
  key: 'ReactGram_v2',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['userReducers'],
}
// const userPersistConfig = {
//   key: 'userReducers',
//   storage,
//   whitelist: ['user']
// }

export const history = createBrowserHistory();

function initStore() {
  const innitialStore = {};

  const store = createStore(
    persistReducer(rootPersistConfig, initReducers(history)),
    innitialStore,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        ...middlewares,
        thunk,
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    ),
  );

  const persistor = persistStore(store);
  return { store, persistor };
}

export default initStore;
