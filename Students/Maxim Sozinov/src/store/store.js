import { createStore, compose, applyMiddleware} from 'redux';
import initialReducers from './reducers';
import middlewares from '../middlewares/index.js';

export default function initStore () {
   let initialStore = {};

   return createStore( 
      initialReducers, 
      initialStore,
      compose(
         applyMiddleware(...middlewares),
         window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : () => {},
      )
   );
}