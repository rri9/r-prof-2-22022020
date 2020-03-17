import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import './style.css'

// Store
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { sendMessage, addChatToMsgStore } from '../../store/actions/messages_action.js'
import { addChat, deleteChat } from '../../store/actions/chats_action.js'
import { push } from 'connected-react-router'

// Components
import Messages from '../MessagesField/MessagesField.jsx'
import ChatList from '../ChatsField/ChatsField.jsx'

class Layout extends Component {
   static propTypes = {
      chatId: PropTypes.number,
      chatRooms: PropTypes.object.isRequired,
      addChat:PropTypes.func.isRequired,
      addChatToMsgStore: PropTypes.func.isRequired,
      deleteChat: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
      messages: PropTypes.object.isRequired,
      sendMessage: PropTypes.func.isRequired,
   }
   static defaultProps = {
      chatId: 1
   }

   render () {
      let { chatId, chatRooms, messages, sendMessage, addChat, addChatToMsgStore, deleteChat, push } = this.props
      
      return (
         <div className="container">
            <Grid container spacing={0}>
               <Grid item xs={3}>
                  <ChatList 
                     chatId={ chatId } 
                     chatRooms={ chatRooms } 
                     messages={ messages } 
                     addChat={ addChat }
                     deleteChat={ deleteChat } 
                     addChatToMsgStore={ addChatToMsgStore } 
                     push={ push } />
               </Grid>
               <Grid item xs={9}>
                  <Messages 
                     chatId={ chatId } 
                     chatRooms={ chatRooms } 
                     messages={ messages } 
                     sendMessage={ sendMessage } />
               </Grid>
            </Grid>
         </div>
      )
   }
}

const mapStateToProps = ({ msgReducer, chatReducer }) => ({
   messages: msgReducer.messages,
   chatRooms: chatReducer.chatRooms
})
const mapDespatchToProps = dispatch => bindActionCreators( { sendMessage, addChatToMsgStore, addChat, deleteChat, push }, dispatch)

export default connect(mapStateToProps, mapDespatchToProps)(Layout)