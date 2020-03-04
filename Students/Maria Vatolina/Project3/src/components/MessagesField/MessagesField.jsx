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
    constructor(props) {
        super(props)
        this.state = {
            msg: '',
            // msgArray: [
            //     { user: 'You', text: 'Halo'},
            //     { user: null, text: null},
            //     { user: 'You', text: 'Can you help me?' },
            //     { user: null, text: 'Yes' }
            // ]
        }
    }

    sendMessage = (text, sender) => {
      const { messages } = this.props
      const messageId = Object.keys(messages).length+1;

      this.props.sendMessage(messageId, sender, text)
      console.log(Object.keys(messages).length);
      
      //   this.setState ({
      //       msgArray: [
      //           ...this.state.msgArray, 
      //           {user: this.props.usr, text: this.state.msg}
      //       ],
      //       msg: ''})    
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
         }
         //   this.sendMessage(event)
   }

   // componentDidUpdate () {
   //      let msgs = this.state.msgArray
   //      if (msgs.length % 2 === 1) {
   //         setTimeout(() => {
   //            this.setState({ 
   //               msgArray: [...this.state.msgArray, {user: null, text: "Please, describe the problem"}],
   //               msg: ''
   //            }) 
   //         }, 500)
   //      }
   //  }

    render() {
        let { usr } = this.props
        let { messages, classes } = this.props
         // console.log(messages);
        let MessagesArr =[]

         Object.keys(messages).forEach(key => {
            MessagesArr.push(<Message 
               sender={ messages[key].user } 
               text={ messages[key].text } 
               key={ key }
            />)
         })

        return (
            <div className={classes.root}>
            <Navbar />

            <Box className={classes.msgList}>
               { MessagesArr }
            </Box>
            <Box className={classes.sendForm} p={2}>
               <Box width="85%" mr={2}>
                  <Input placeholder="Enter your message..."
                     fullWidth={ true }
                     onChange={ this.handleChange }  
                     // onKeyUp={ this.handleChange }
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
