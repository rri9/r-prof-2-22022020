import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { Input, IconButton, Box } from '@material-ui/core'
import { Send, SentimentVerySatisfiedRounded, AttachmentRounded } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import Navbar from '../MessagesNavbar/MessagesNavbar.jsx'
import Message from '../Message/Message.jsx'

const useStyles = (theme => ({
   root: {
      heigth: '100vh',
      width: "100%"
   },
   msgList: {
      height: 'calc(100vh - 163px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: theme.spacing(2)
   },
   sendForm: {
      position: 'static',
      display: 'flex',
      justifyContent: 'space-between',
   }
}))

class Messages extends Component {
   constructor (props) {
      super(props)
      this.state = { 
         msg: '',
         msgArray: [
            { user: null, text: "Any problems?" },
            { user: "Me", text: "I clicked something and everything disappeared" },
            { user: null, text: null },
            { user: "Me", text: "And what?" },
         ] 
      }
   }

   sendMsg = () => {
      this.setState({ 
         msgArray: [...this.state.msgArray, {user: this.props.usr, text: this.state.msg}],
         msg: ''
      }) 
   }

   handleChange = (event) => {
      event.keyCode !== 13 ?
         this.setState({ msg: event.target.value }) :
         this.sendMsg()
   }

   componentDidUpdate () {
      let msgs = this.state.msgArray
      if (msgs.length % 2 === 1) {
         setTimeout(() => {
            this.setState({ 
               msgArray: [...this.state.msgArray, {user: null, text: "We'll call you back"}],
               msg: ''
            }) 
         }, 500)
      }
   }

   render() {
      let { usr, classes } = this.props
      let { msgArray } = this.state

      let MessagesArr = msgArray.map((message, index) => <Message sender={ message.user } text={ message.text } key={ index }/>)

      return (
         <div className={classes.root}>
            <Navbar />

            <Box className={classes.msgList}>
               { MessagesArr }
            </Box>

            {/* to have create new component for send message */}
            <Box className={classes.sendForm} p={2}>
               <Box width="85%" mr={2}>
                  <Input placeholder="Type your message..."
                     fullWidth={ true }
                     onChange={ this.handleChange } 
                     onKeyUp={ this.handleChange }
                     value={ this.state.msg }/>
               </Box>
               <IconButton aria-label="send" onClick={ this.sendMsg }>
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