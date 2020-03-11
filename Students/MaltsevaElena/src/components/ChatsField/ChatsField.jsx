import React, {Component} from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'

// Styles, UI
import { AppBar, 
         Box,
         Button,
         Dialog, DialogActions, DialogContent, DialogTitle, 
         List, 
         Input, InputBase,
         IconButton, 
         Toolbar } from '@material-ui/core'
import { AddCircle, Search } from '@material-ui/icons'
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
   },
   grow: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: 'none',
   },
   search: {
      borderBottom: '1px solid rgba(255, 255, 255, .2)'
   },
   inputSearch: {
      color: 'inherit',
      padding: theme.spacing(1),
   },
   addBtn: {
      marginRight: theme.spacing(1),
      color: theme.palette.common.white,
   },
   cancelBtn: {
      color: theme.palette.secondary.light
   },
}))

// Children components
import Chat from '../Chat/Chat.jsx'
import Navigation from '../ChatsNavigation/ChatsNavigation.jsx'

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
      input: '',
      openDialog: false,
      search: ''
   }
   
   handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
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
         this.handleClickOpenClose()
      }
   }

   handleClickOpenClose = () => {
      this.setState({ openDialog: !this.state.openDialog })
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

      let ChatRoomsFiltered = []
      if (this.state.search !== '') {
         let searchRequest = new RegExp(this.state.search, 'gi')
         ChatRoomsFiltered = ChatRoomsArr.filter(room => {
            return searchRequest.test(room.props.title)
         })
      } else ChatRoomsFiltered = ChatRoomsArr

      return (
         <Box className={ classes.root }>

            {/* Navbar: create and search functions */}
            <AppBar position="static" className={ classes.grow }>
               <Toolbar className={ classes.search }>
                  <IconButton aria-label="create" edge="start" className={ classes.addBtn }
                     onClick={ this.handleClickOpenClose }>
                     <AddCircle />
                  </IconButton>
                  <Search />
                  <InputBase aria-label="search" className={ classes.inputSearch }
                     name="search"
                     placeholder="Search in all..."
                     onChange={ this.handleChange }
                     value={ this.state.search }
                  />
               </Toolbar>
            </AppBar>

            {/* Popup for creating new chat */}
            <Dialog fullWidth open={ this.state.openDialog } onClose={ this.handleClickOpenClose }>
               <DialogTitle>Create new chat</DialogTitle>
               <DialogContent>
                  <Input autoFocus fullWidth margin="dense"
                     name="input"
                     placeholder="Add new chat"
                     onChange={ this.handleChange }
                     onKeyUp={ this.handleKeyUp }
                     value={ this.state.input }
                  />
               </DialogContent>
               <DialogActions>
                  <Button onClick={ this.handleClickOpenClose } className={ classes.cancelBtn }>
                     Cancel
                  </Button>
                  <Button onClick={ this.handleAdd } color="secondary">
                     Create
                  </Button>
               </DialogActions>
            </Dialog>

            <List className={ classes.chatList }>
               { ChatRoomsFiltered }
            </List>

            <Navigation />

         </Box>
      )
   }
}

export default withStyles(useStyles)(ChatList)