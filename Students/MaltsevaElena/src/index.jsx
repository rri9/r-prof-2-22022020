import React from 'react'
import ReactDom from 'react-dom'
import 'bootstrap'
import { Grid, Container } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import 'typeface-roboto'
import './index.css'

import Messages from './components/MessagesField/MessagesField.jsx'
import Chats from './components/ChatsField/ChatsField.jsx'

import { Provider } from 'react-redux'
import initStore from './store/store.js'

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
   <Provider store={ initStore() }>
      <ThemeProvider theme={ darkTheme }>
         <div className="container">
            <Grid container spacing={0}>
               <Grid item xs={3}>
                  <Chats />
               </Grid>
               <Grid item xs={9}>
                  <Messages usr={user} />
               </Grid>
            </Grid>
         </div>
      </ThemeProvider>
   </Provider>,
   document.getElementById('app')
)