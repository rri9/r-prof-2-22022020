import React from 'react';
import ReactDOM from 'react-dom';

import MessageField from './components/MessageField/MessageField.jsx';

const msgs = [
  {
    sender: 'Me',
    text: 'Hello!',
  },
  {
    sender: null,
    text: null,
  },
  {
    sender: 'Me',
    text: 'How are You?',
  },
  {
    sender: null,
    text: null,
  },
];

ReactDOM.render(
  <MessageField msgs = { msgs } />,
  document.getElementById('app'),
);