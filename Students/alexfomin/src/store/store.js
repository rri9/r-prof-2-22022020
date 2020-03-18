import { createStore, applyMiddleware, compose } from 'redux';
import middlewares from '../middlewares';

import initialReducers from './reducers' //import Mega Reducer

export default function initStore() {
    let initialStore = {}

    return createStore(initialReducers, initialStore,
        compose(
            applyMiddleware(...middlewares),
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : () => {},
        )
        )
}