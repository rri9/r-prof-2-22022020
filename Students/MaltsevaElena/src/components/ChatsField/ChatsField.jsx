import React, {Component} from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'

// Styles, UI
import { Box, List } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const useStyles = (theme => ({
   root: {
      borderRight: '4px solid rgba(0, 0, 0, .1)',
   },
   chatList: {
      height: 'calc(100vh - 145px)',
      padding: theme.spacing(1, 0),
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.common.white
   }
}))

// Children components
import NavBar from '../ChatsNavbar/ChatsNavbar.jsx'
import Chat from '../Chat/Chat.jsx'
import TabBar from '../ChatsTabbar/ChatsTabbar.jsx'

class Chats extends Component {
   static propTypes = {
      chatId: PropTypes.number.isRequired,
      chats: PropTypes.object.isRequired,
      messages: PropTypes.object.isRequired,
      classes: PropTypes.object
   }

   render() {
      const { chatId, chats, messages, classes } = this.props

      let ChatsArr = []
      Object.keys(chats).forEach(chatRoomId => {
         let lastMsgIndex = Object.keys(messages[chatRoomId]).length
         ChatsArr.push( 
            <Chat 
               link={ `/chat/${chatRoomId}` }
               title={ chats[chatRoomId].title }
               message={ messages[chatRoomId][lastMsgIndex].text }
               isSelected={ chatId === +chatRoomId }
               key={ chatRoomId }
            />
         )
      })

      return (
         <Box className={classes.root}>
            <NavBar />
            <List className={classes.chatList}>
               { ChatsArr }
            </List>      
            <TabBar />
         </Box>
      )
   }
}

export default withStyles(useStyles)(Chats)