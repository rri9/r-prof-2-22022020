import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/router.jsx';
import { Provider } from 'react-redux';
import initStore from './store/store.js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  //TODO add some theme styles
});

ReactDOM.render(
  <Provider store={ initStore() } >
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Router />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
    document.getElementById('app'),
);