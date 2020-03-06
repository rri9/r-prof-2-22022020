import React from 'react';
import ReactDom from 'react-dom';

import { BrowserRouter, Link } from 'react-router-dom';
import Router from './router/Router.jsx';

import { Provider } from 'react-redux';
import initStore from './store/store';

import { Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';


ReactDom.render (
    <BrowserRouter>
        <Provider store = { initStore() }>
            <Container className="vh-100 overflow-hidden d-flex flex-column justify-content-between">
                <Row className="header p-2 rounded-top shadow">

                    <Link to={'/'}><h1>First React App</h1></Link>
                </Row>
    
                <Router />
    
            </Container>
        </Provider>
    </BrowserRouter>,
    document.getElementById('app')
);