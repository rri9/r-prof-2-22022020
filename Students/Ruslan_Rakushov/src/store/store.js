import { createStore, compose, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import initReducers from './reducers';

export const history = createBrowserHistory();

function initStore() {
  const innitialStore = {};

  return createStore(
    initReducers(history),
    innitialStore,
    compose(
      applyMiddleware(routerMiddleware(history)),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    ),
   );
}

export default initStore;
