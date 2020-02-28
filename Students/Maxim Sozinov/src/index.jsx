import React from 'react';
import ReactDom from 'react-dom';
import { Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Messages from './components/MessagesField/MessagesField.jsx';

let user = 'Darth Vader';

/* jshint ignore:start */
ReactDom.render (
    <Container className="vh-100 overflow-hidden d-flex flex-column justify-content-between">
        <Col>
            <h1>First React App</h1>
            <p>Hello { user }!</p>
        </Col>
        <Messages usr={ user }/>
    </Container>,
    document.getElementById('app')
);