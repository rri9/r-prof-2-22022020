import { createStore } from 'redux';
import initialReducers from './reducers';

export default function initStore () {
   let initialStore = {};

   return createStore( 
      initialReducers, 
      initialStore,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
   );
}