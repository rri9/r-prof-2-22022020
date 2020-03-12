import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Router from './router/router.jsx';
import { Provider } from 'react-redux';
import initStore, { history } from './store/store.js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  //TODO add some theme styles
});

ReactDOM.render(
  <Provider store={ initStore() } >
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <Router />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
    document.getElementById('app'),
);