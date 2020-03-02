import React from 'react';
import ReactDOM from 'react-dom';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

import MessageField from './components/MessageField/MessageField.jsx';

const theme = createMuiTheme({
  //TODO add some theme styles
});

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
  <MuiThemeProvider theme={theme}>
    <MessageField msgs={msgs} />
  </MuiThemeProvider>,
  document.getElementById('app'),
);