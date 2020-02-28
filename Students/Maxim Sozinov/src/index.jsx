import React from 'react';
import ReactDom from 'react-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Messages from './components/MessagesField/MessagesField.jsx';

let user = 'Darth Vader';

/* jshint ignore:start */
ReactDom.render (
    <Container className="vh-100 overflow-hidden d-flex flex-column">
        <h1>First React App</h1>
        <Messages usr={ user }/>
    </Container>,
    document.getElementById('app')
);