import React, {Component} from 'react'
import ReactDom from 'react-dom'
import { Box } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import NavBar from '../ChatsNavbar/ChatsNavbar.jsx'
import ChatList from '../Chat/Chat.jsx'
import TabBar from '../ChatsTabbar/ChatsTabbar.jsx'

const useStyles = (theme => ({
   root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      borderRight: '4px solid rgba(0, 0, 0, .1)',
   }
}))

class Chats extends Component {
   constructor (props) {
      super(props)
   }
   render() {

      const { classes } = this.props

      return (
         <Box className={classes.root}>
            <NavBar />
            <Box height="calc(100vh - 128px)">
               <ChatList />
            </Box>
            <TabBar />
         </Box>
      )
   }
}

export default withStyles(useStyles)(Chats)