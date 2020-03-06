import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import './style.css'

import Messages from '../MessagesField/MessagesField.jsx'
import Chats from '../ChatsField/ChatsField.jsx'

export default class Layout extends Component {
   static propTypes = {
      chatId: PropTypes.number
   }
   static defaultProps = {
      chatId: 1
   }

   render () {
      return (
         <div className="container">
            <Grid container spacing={0}>
               <Grid item xs={3}>
                  <Chats chatId={ this.props.chatId } />
               </Grid>
               <Grid item xs={9}>
                  <Messages chatId={ this.props.chatId } />
               </Grid>
            </Grid>
         </div>
      )
   }
}