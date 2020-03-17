import { createStore, applyMiddleware, compose } from 'redux';
import middlewares from '../middlewares/index.js';
import { createBrowserHistory } from 'history';
import initReducers from './reducers';
import { routerMiddleware } from 'connected-react-router';

//import initialReducers from './reducers'; //import Mega Reducer

export const history = createBrowserHistory()

export default function initStore() {
    let initialStore = {}

    return createStore( initReducers(history), initialStore,
        compose(
            applyMiddleware(routerMiddleware(history), ...middlewares),
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : () => {},
        )
        )
}