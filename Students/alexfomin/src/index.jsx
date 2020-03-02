import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.css';
import { Container, Row, Col } from 'reactstrap';

import Messages from './components/MessagesField/MessagesField.jsx'

let user = 'Darth Vader'

ReactDom.render (
    <Messages usr={ user }/>,
    document.getElementById('app')
);

