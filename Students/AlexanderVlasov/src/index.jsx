import React from "react";
import ReactDom from "react-dom";
import { ThemeProvider, createMuiTheme, CssBaseline, Container, Fab, Grid } from "@material-ui/core";
import { Provider } from 'react-redux';
import initStore from './store/store.js';

import '../node_modules/bootstrap/dist/css/bootstrap-grid.css';
import 'typeface-roboto';

import Header from './components/Header/Header.jsx';

import Router from './router/Router.jsx';
import { BrowserRouter } from 'react-router-dom';

const theme = createMuiTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });

let user = 'Alex';
ReactDom.render(
    <BrowserRouter>
        <Provider store = { initStore() }>
            <ThemeProvider theme={theme}>
                <CssBaseline></CssBaseline>
                <Container maxWidth="lg">
                    <Header usr={ user }/>
                    <Router/>
                </Container>
            </ThemeProvider>
        </Provider>
    </BrowserRouter>, 
    document.getElementById("app")
);
