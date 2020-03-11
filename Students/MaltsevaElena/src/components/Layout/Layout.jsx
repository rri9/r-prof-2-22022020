import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import './style.css'

// Store
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { sendMessage } from '../../store/actions/messages_action.js'

// Components
import Messages from '../MessagesField/MessagesField.jsx'
import Chats from '../ChatsField/ChatsField.jsx'

class Layout extends Component {
   static propTypes = {
      chatId: PropTypes.number,
      chats: PropTypes.object.isRequired,
      messages: PropTypes.object.isRequired,
      sendMessage: PropTypes.func.isRequired,
   }
   static defaultProps = {
      chatId: 1
   }

   render () {
      let { chatId, chats, messages, sendMessage } = this.props
      return (
         <div className="container">
            <Grid container spacing={0}>
               <Grid item xs={3}>
                  <Chats chatId={ chatId } chats={ chats } messages={ messages } />
               </Grid>
               <Grid item xs={9}>
                  <Messages chatId={ chatId } chats={ chats } messages={ messages } sendMessage={ sendMessage } />
               </Grid>
            </Grid>
         </div>
      )
   }
}

const mapStateToProps = ({ msgReducer, chatReducer }) => ({
   messages: msgReducer.messages,
   chats: chatReducer.chatRooms
})
const mapDespatchToProps = dispatch => bindActionCreators( {sendMessage}, dispatch)

export default connect(mapStateToProps, mapDespatchToProps)(Layout)