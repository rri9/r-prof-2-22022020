import React from 'react';
import ReactDom from 'react-dom';

import { Link } from 'react-router-dom';
import Router from './router/Router.jsx';

import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react'; 

import { Provider } from 'react-redux';
import initStore, { history } from './store/store';

import { Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

const { store, persistor } = initStore(); 

ReactDom.render(

    <Provider store={store}>
        <PersistGate loading={ null } persistor={ persistor }>
            <ConnectedRouter history={history}>
                <Container className="vh-100 overflow-hidden d-flex flex-column justify-content-between">
                    <Row className="header p-2 rounded-top shadow">
                        <Link to={'/'}><h1>First React App</h1></Link>
                    </Row>
    
                    <Router />
    
                </Container>
            </ConnectedRouter>
        </PersistGate>
    </Provider>
    ,
    document.getElementById('app')
);