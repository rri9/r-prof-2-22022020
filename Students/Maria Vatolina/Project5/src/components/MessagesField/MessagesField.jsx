import React, {Component} from 'react';
import ReactDom from 'react-dom';
import './style.css';
import { Input, IconButton, Box } from '@material-ui/core'
import { Send, SentimentVerySatisfiedRounded, AttachmentRounded } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

import Navbar from '../MessagesNavbar/MessagesNavbar.jsx'
import Message from '../Message/Message.jsx'

//ACTIONS
import { sendMessage } from '../../store/actions/messages_actions.js'

//redux
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'

const useStyles = (theme => ({
   root: {
       heigth: '100vh',
       width: "100%"
    },
   msgList: {
      overflow: 'auto'
   },
   msgBlock: {
      height: 'calc(100vh - 160px)',
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
   mesagesRef= React.createRef()
   constructor(props) {
      super(props)
      this.state = {
         msg: '',
      }   
   }

   sendMessage = (text, sender) => {
      const { messages } = this.props
      const messageId = Object.keys(messages).length + 1;
      this.props.sendMessage(messageId, sender, text)
      
      this.scrollToBottom()   
   }

   handleSendMessage = (message, sender) => {
      this.setState({ msg: '' })
      if (sender == 'Darth Vader') {
         this.sendMessage (message, sender) 
      }
   }

   handleChange = (event) => {
         if (event.keyCode !== 13 ) {
           this.setState({ msg: event.target.value })           
         } else {
            this.sendMessage(this.state.msg, this.props.usr)
            this.setState({ msg: ''})
         }
   }

   componentDidUpdate () {
      const { messages } = this.props;

      if (Object.keys(messages).length % 2 === 1) {
         setTimeout(() => {
         this.sendMessage('Please, wait...');
         }, 500)
      }

      this.scrollToBottom()
   }

   componentDidMount() {
      
      this.scrollToBottom();
   }

   scrollToBottom = () => {
      this.mesagesRef.current.lastElementChild.scrollIntoView({ behavior: 'smooth' })
   }

   render() {
      let usr = 'Darth Vader'
      let { messages, classes } = this.props
      let MessagesArr =[]

      Object.keys(messages).forEach(messageId => {
         MessagesArr.push( <Message 
            sender={ messages[messageId].user } 
            text={ messages[messageId].text } 
            key={ messageId }
         />)
      })

      return (
         <div  className={classes.root}>
         <Navbar title={ this.props.chatId }/>
         <Box className={classes.msgBlock}>
            <Box className={classes.msgList} ref={this.mesagesRef}>
               { MessagesArr }
            </Box>
         </Box>
         <Box className={classes.sendForm} p={2}>
            <Box width="85%" mr={2}>
               <Input placeholder="Enter your message..."
                  fullWidth={ true }
                  onChange={ this.handleChange }  
                  onKeyUp={ this.handleChange }
                  value={ this.state.msg }/>
            </Box>
            <IconButton aria-label="send" onClick={ () => this.handleSendMessage(this.state.msg, usr) }>
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

const mapStateToProps = ({ msgReducer }) => ({
   messages: msgReducer.messages
})
const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Messages))
