import React from 'react'
import ReactDom from 'react-dom'
import 'bootstrap'
import { Grid, Container } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import 'typeface-roboto'
import './index.css'

import Messages from './components/MessagesField/MessagesField.jsx'
import Chats from './components/ChatsField/ChatsField.jsx'

let user = 'Me'

const darkTheme = createMuiTheme({
   palette: {
      type: 'dark',
      primary: {
         light: '#2C2C6A',
         main: '#1F1F4B',
         dark: '#141433',
         contrastText: '#fff',
      },
      secondary: {
         light: '#D05CAF',
         main: '#4C92E3',
         dark: '#3B3B86',
         contrastText: '#fff',
      }, 
      background: {
         paper: '#141433',
         default: "#fff"
      }
   },
})

ReactDom.render (
   <ThemeProvider theme={darkTheme}>
      <Container fixed>
         <Grid container spacing={0}>
            <Grid item xs={3} style={{height: 100 + 'vh'}}>
               <Chats />
            </Grid>
            <Grid item xs={9} style={{height: 100 + 'vh'}}>
               <Messages usr={user} />
            </Grid>
         </Grid>
      </Container>
   </ThemeProvider>,
   document.getElementById('app')
)