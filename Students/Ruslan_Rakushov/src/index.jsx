import React from 'react';
import ReactDOM from 'react-dom';

import Message from './components/Message/Message.jsx';

const Msgs = [
  {
    sender: 'Me',
    text: 'Hello!',
  },
  {
    sender: null,
    text: null,
  },
];
const msg = {sender: 'Me', text: 'Hello!',};

ReactDOM.render(
  <Message msg = { msg } />,
  document.getElementById('app'),
);