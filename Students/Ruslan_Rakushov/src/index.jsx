import React from 'react';
import ReactDOM from 'react-dom';
// import Router from './router/router.jsx';
// import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'connected-react-router';
// import { PersistGate } from 'redux-persist/integration/react';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import initStore, { history } from './store/store.js';

// const { store, persistor } = initStore();

// const theme = createMuiTheme({
  //TODO add some theme styles
// });

ReactDOM.render(
  // <Provider store={ store } >
    // <PersistGate loading= {null} persistor={persistor}>
      // <ConnectedRouter history={history}>
        // <MuiThemeProvider theme={theme}>
          // <Router />
        // </MuiThemeProvider>
      // </ConnectedRouter>
    // </PersistGate>
  // </Provider>,
  <h1>Lets start again!</h1>,
  document.getElementById('app'),
);