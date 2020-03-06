import React from 'react';
import ReactDom from 'react-dom';

import { Provider } from 'react-redux';
import initStore from './store/store';

import { Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

import Messages from './components/MessagesField/MessagesField.jsx';

let user = 'Darth Vader';

ReactDom.render (
    <Provider store = { initStore() }>
        <Container className="vh-100 overflow-hidden d-flex flex-column justify-content-between">
            <Row className="header p-2 rounded-top shadow">
                <h1>First React App</h1>
            </Row>

            <Row className="align-items-end h-75 flex-grow-1">
                <div className="bg-light h-100 col-2 d-flex flex-column justify-content-between p-0">
                    <div>
                    <p>Hello { user }!</p>
                        ChatList
                    </div>
                    <footer className="text-white bg-dark w-100 text-center">
                        ReactGram &copy;
                    </footer>
                </div>
                <Messages usr={ user }/>
            </Row>


        </Container>
    </Provider>,
    document.getElementById('app')
);