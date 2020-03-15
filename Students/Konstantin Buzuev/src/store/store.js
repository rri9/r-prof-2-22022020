import initialReducers from './reducers'
import {
    createStore,
    compose,
    applyMiddleware
} from 'redux'

import {
    createBrowserHistory
} from 'history';
import {
    routerMiddleware
} from 'connected-react-router';

export const history = createBrowserHistory()

import middlewares from '../middlewares/index.js'

function initStore() {
    let initialStore = {}
    return createStore(
        initialReducers(history),
        initialStore,
        compose(applyMiddleware(routerMiddleware(history), ...middlewares),
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : () => {}))
}

export default initStore