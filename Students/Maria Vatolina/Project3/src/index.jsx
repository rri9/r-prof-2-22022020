import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap';
import { Grid, Container } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
// import 'typeface-roboto'

import './index.css'

import Messages from './components/MessagesField/MessagesField.jsx'
import Chats from './components/ChatList/ChatList.jsx'

import { Provider } from 'react-redux'
import initStore from './store/store.js'

let user = 'Darth Vader'

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#00695f',
            main: '#009688',
            dark: '#33ab9f',
        },
        secondary: {
          main: '#ffe082',
        },
        background: {
            paper: '#00695f',
            default: "#fff"
         }
      },
})

ReactDom.render (
   <Provider store = { initStore() }>
      <ThemeProvider theme={theme}>
         <Container fixed>
            <Grid container spacing={0}>
               <Grid item xs={3} style={{height: 100 + 'vh'}}>
                  <Chats />
               </Grid>
               <Grid item xs={9} style={{height: 100 + 'vh'}}>
                  <Messages usr={ user } />
               </Grid>
            </Grid>
         </Container>
      </ThemeProvider>
   </Provider>,
    document.getElementById('app')
)