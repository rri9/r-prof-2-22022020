import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import './style.css'

// Store
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { sendMessage, addChatToMsgStore } from '../../store/actions/messages_action.js'
import { addChat } from '../../store/actions/chats_action.js'

// Components
import Messages from '../MessagesField/MessagesField.jsx'
import ChatList from '../ChatsField/ChatsField.jsx'

class Layout extends Component {
   static propTypes = {
      chatId: PropTypes.number,
      chatRooms: PropTypes.object.isRequired,
      addChat:PropTypes.func.isRequired,
      addChatToMsgStore: PropTypes.func.isRequired,
      messages: PropTypes.object.isRequired,
      sendMessage: PropTypes.func.isRequired,
   }
   static defaultProps = {
      chatId: 1
   }

   render () {
      let { chatId, chatRooms, messages, sendMessage, addChat, addChatToMsgStore } = this.props
      return (
         <div className="container">
            <Grid container spacing={0}>
               <Grid item xs={3}>
                  <ChatList chatId={ chatId } chatRooms={ chatRooms } messages={ messages } addChat={ addChat } addChatToMsgStore={ addChatToMsgStore }/>
               </Grid>
               <Grid item xs={9}>
                  <Messages chatId={ chatId } chatRooms={ chatRooms } messages={ messages } sendMessage={ sendMessage } />
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
const mapDespatchToProps = dispatch => bindActionCreators( { sendMessage, addChatToMsgStore, addChat }, dispatch)

export default connect(mapStateToProps, mapDespatchToProps)(Layout)