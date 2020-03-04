import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap';

import Messages from './components/MessagesField/MessagesField.jsx'

import { Provider } from 'react-redux'
import initStore from './store/store.js'

let user = 'Darth Vader'

ReactDom.render (
    <Provider store = { initStore() }>
        <Messages usr={ user }/>
    </Provider>

    , document.getElementById('app')
);