import React, {Component} from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'

// Styles, UI
import { Box, List, ListItem, Input, IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { AddCircle } from '@material-ui/icons'

const useStyles = (theme => ({
   root: {
      borderRight: '4px solid rgba(0, 0, 0, .1)',
   },
   chatList: {
      height: 'calc(100vh - 217px)',
      padding: theme.spacing(1, 0),
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.common.white
   },
   newChat: {
      padding: theme.spacing(1.5),
   }
}))

// Children components
import NavBar from '../ChatsNavbar/ChatsNavbar.jsx'
import Chat from '../Chat/Chat.jsx'
import TabBar from '../ChatsTabbar/ChatsTabbar.jsx'

class ChatList extends Component {
   static propTypes = {
      chatId: PropTypes.number.isRequired,
      chatRooms: PropTypes.object.isRequired,
      addChat: PropTypes.func.isRequired,
      addChatToMsgStore: PropTypes.func.isRequired,
      messages: PropTypes.object.isRequired,
      classes: PropTypes.object
   }

   state = {
      input: ''
   }

   handleChange = (event) => {
      this.setState({ input: event.target.value })
   }

   handleKeyUp = (event) => {
      if (event.keyCode === 13) {
         this.handleAdd()
      }
   }

   handleAdd = () => {
      let { chatRooms, addChat, addChatToMsgStore } = this.props
      const newChatId = Object.keys(chatRooms).length + 1

      if ( this.state.input !== '') {
         addChat(newChatId, this.state.input)
         addChatToMsgStore(newChatId)
         this.setState({ input: '' })
      }
   }

   render() {
      const { chatId, chatRooms, messages, classes } = this.props

      let ChatRoomsArr = []
      Object.keys(chatRooms).forEach(chatRoomId => {
         let lastMsgIndex
         messages[chatRoomId] ? lastMsgIndex = Object.keys(messages[chatRoomId]).length : ''
         ChatRoomsArr.push( 
            <Chat 
               link={ `/chat/${chatRoomId}` }
               title={ chatRooms[chatRoomId].title }
               message={ lastMsgIndex ? messages[chatRoomId][lastMsgIndex].text : '* No messages yet *'}
               isSelected={ chatId === +chatRoomId }
               key={ chatRoomId }
            />
         )
      })

      return (
         <Box className={classes.root}>
            <NavBar />
            <List className={classes.chatList}>
               { ChatRoomsArr }
            </List>

            <Box className={classes.newChat}>
               <IconButton aria-label="create" onClick={ () => this.handleAdd() }>
                  <AddCircle />
               </IconButton>
               <Input name="input"
                  placeholder="Add new chat"
                  onChange={ this.handleChange }
                  onKeyUp={ this.handleKeyUp }
                  value={ this.state.input }
               />
            </Box>

            <TabBar />
         </Box>
      )
   }
}

export default withStyles(useStyles)(ChatList)