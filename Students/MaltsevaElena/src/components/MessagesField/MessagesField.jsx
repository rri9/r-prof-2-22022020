import React, { Component } from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'

// Styles, UI
import { Input, IconButton, Box } from '@material-ui/core'
import { Send, SentimentVerySatisfiedRounded, AttachmentRounded } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

const useStyles = (theme => ({
   msgBlock: {
      height: 'calc(100vh - 160px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: theme.spacing(2)
   },
   msgList: {
      overflow: 'auto'
   },
   sendForm: {
      maxHeight: '64px',
      position: 'static',
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(1, 2, 0, 2)
   }
}))

// Children components
import Header from '../MessagesHeader/MessagesHeader.jsx'
import Message from '../Message/Message.jsx'

class Messages extends Component {
   static propTypes = {
      chatId: PropTypes.number.isRequired,
      chatRooms: PropTypes.object.isRequired,
      messages: PropTypes.object.isRequired,
      sendMessage: PropTypes.func.isRequired,
      classes: PropTypes.object
   }
   
   state = {
      usr: 'Me', 
      msg: '',
   }

   msgList = React.createRef()

   scrollToNewMsg () {
      if (this.msgList.current.lastChild) {
         this.msgList.current.lastChild.scrollIntoView({block: 'end', behavior: 'smooth'})
      }
   }

   sendMsg = ( text, sender ) => {
      let { chatId, messages, sendMessage } = this.props
      let chatMessages = messages[chatId]
      const messageId = Object.keys(chatMessages).length + 1

      sendMessage(chatId, messageId, sender, text)
   }

   handleSendMsg = (text, sender) => {
      this.setState({ msg: ''})
      if (text.length > 0) this.sendMsg(text, sender)
   }

   handleChange = (event) => {
      if (event.keyCode !== 13) {
         this.setState({ msg: event.target.value })
      } else {
         this.sendMsg(this.state.msg, this.state.usr)
         this.setState({ msg: ''})
      }
   }

   componentDidUpdate (prevProps) {
      let { chatId, messages } = this.props
      let chatMessages = messages[chatId]

      if (Object.keys(prevProps.messages[chatId]).length < Object.keys(chatMessages).length &&
         chatMessages[Object.keys(chatMessages).length].user === this.state.usr) {
         setTimeout(() => {
            this.sendMsg("We'll call you back") 
         }, 500)
      }
      this.scrollToNewMsg()
   }

   render() {
      let { chatId, chatRooms, messages, classes } = this.props
      let chatMessages = messages[chatId]

      let MessagesArr = []
      Object.keys(chatMessages).forEach(messageId => {
         MessagesArr.push( 
            <Message 
               sender={ chatMessages[messageId].user } 
               text={ chatMessages[messageId].text } 
               key={ messageId }
               chatId={ chatId }
               chatRooms={ chatRooms }
            /> 
         )
      })

      return (
         <div>
            <Header title={ chatRooms[chatId].title }/>

            <Box className={ classes.msgBlock }>
               <Box className={ classes.msgList } ref={ this.msgList }>
                  { MessagesArr ? MessagesArr : '' }
               </Box>
            </Box>

            {/* to have create new component for send message */}
            <Box className={ classes.sendForm }>
               <Box width="85%" mr={2}>
                  <Input placeholder="Type your message..."
                     autoFocus={ true }
                     fullWidth={ true }
                     onChange={ this.handleChange } 
                     onKeyUp={ this.handleChange }
                     value={ this.state.msg } />
               </Box>
               <IconButton aria-label="send" onClick={ () => this.handleSendMsg(this.state.msg, this.state.usr ) }>
                  <Send />
               </IconButton>
               <IconButton aria-label="smile">
                  <SentimentVerySatisfiedRounded />
               </IconButton>
               <IconButton aria-label="attachment" >
                  <AttachmentRounded />
               </IconButton>
            </Box>

         </div>
      )
   }
}

export default withStyles(useStyles)(Messages)