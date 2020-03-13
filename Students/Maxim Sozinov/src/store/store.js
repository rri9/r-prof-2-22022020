import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import initialReducers from './reducers';
import middlewares from '../middlewares/index.js';

export const history = createBrowserHistory();

function initStore () {
   let initialStore = {};

   return createStore( 
      initialReducers( history ), 
      initialStore,
      compose(
         applyMiddleware( routerMiddleware(history), ...middlewares ),
         window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : () => {},
      )
   );
}

export default initStore;