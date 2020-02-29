import React from "react";
import ReactDom from "react-dom";
import { ThemeProvider, createMuiTheme, CssBaseline, Container, Fab, Grid } from "@material-ui/core";

import '../node_modules/bootstrap/dist/css/bootstrap-grid.css';
import 'typeface-roboto';

import Messages from './components/MessagesField/MessagesField.jsx';
import Header from './components/Header/Header.jsx';
import ChatList from './components/ChatList/ChatList.jsx';

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
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-start"
                spacing={1}
            >
                <Grid item xs={3}>
                    <ChatList />
                </Grid>
                <Grid item xs={9}>
                    <Messages usr={ user }/>
                </Grid>
            </Grid>
        </Container>
    </ThemeProvider>, 
    document.getElementById("app")
);
