import React from "react";
import ReactDom from "react-dom";
import { ThemeProvider, createMuiTheme, CssBaseline, Container, Fab } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

import '../node_modules/bootstrap/dist/css/bootstrap-grid.css';
import 'typeface-roboto';

import Messages from './components/MessagesField/MessagesField.jsx';
import Header from './components/Header/Header.jsx';

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
    <ThemeProvider theme={theme}>
        <CssBaseline></CssBaseline>
        <Container maxWidth="lg">
            <Header usr={ user }/>
            <div className="d-flex">
                <div className="chat-list">
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
                Создать чат
                </div>
                <Messages usr={ user }/>
            </div>
        </Container>
    </ThemeProvider>, 
    document.getElementById("app")
);
