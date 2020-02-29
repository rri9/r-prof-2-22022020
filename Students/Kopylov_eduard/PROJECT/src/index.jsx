import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap';
import Messages from './components/MessagesField/MessagesField.jsx';

let user = 'Darth Vader';

ReactDom.render(

    <Messages usr = {user}/>,
    document.getElementById('app')
    
);