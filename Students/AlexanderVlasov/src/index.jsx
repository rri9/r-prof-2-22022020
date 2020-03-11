import React from "react";
import ReactDom from "react-dom";
import { ThemeProvider, createMuiTheme, CssBaseline, Container } from "@material-ui/core";
import { Provider } from 'react-redux';
import initStore from './store/store.js';

import '../node_modules/bootstrap/dist/css/bootstrap-grid.css';
import 'typeface-roboto';

import Header from './components/Header/Header.jsx';

import Router from './router/Router.jsx';
import { HashRouter } from 'react-router-dom';

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
    pallete: {
        primary: {
            dark: '#3f51b5',
            light: '#fff'
        }
    }
  });

let user = 'Alex';
ReactDom.render(
    <HashRouter>
        <Provider store = { initStore() }>
            <ThemeProvider theme={theme}>
                <CssBaseline></CssBaseline>
                <Container maxWidth="lg">
                    <Header usr={ user }/>
                    <Router/>
                </Container>
            </ThemeProvider>
        </Provider>
    </HashRouter>, 
    document.getElementById("app")
);
