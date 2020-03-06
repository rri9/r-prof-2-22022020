import React from 'react';
import ReactDom from 'react-dom';

import { Provider } from 'react-redux';
import initStore from './store/store';

import { Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

import Layout from './components/Layout/Layout.jsx';


ReactDom.render (
    <Provider store = { initStore() }>
        <Container className="vh-100 overflow-hidden d-flex flex-column justify-content-between">
            <Row className="header p-2 rounded-top shadow">
                <h1>First React App</h1>
            </Row>

            <Layout />

        </Container>
    </Provider>,
    document.getElementById('app')
);