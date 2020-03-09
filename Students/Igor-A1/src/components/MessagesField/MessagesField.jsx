import React, {Component} from 'react';
import ReactDom from 'react-dom';

import { withStyles } from '@material-ui/core/styles';
import { TextField, FloatingActionButton } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

import Message from '../Message/Message.jsx'

const useStyles = (theme => ({
   root: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.main,
      padding: theme.spacing(4)
   },
   foot: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary,
      padding: theme.spacing(2)
   },
   hovered: {
      '&:hover, &:active': {
         color: theme.palette.secondary.main
      },
   },
   input: {
     color: "#FFF59D"
   }
}));

import botData from './botData.json'
const randomBotData = () => Math.floor(Math.random() * botData.emoji.length)
const randomBotEmoj = () => String.fromCodePoint(botData.emoji[randomBotData()])
const randomBotMsg = () => botData.msg[randomBotData()]
const botPrefix = 'bot :: '

class Messages extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
          msgArray: [
            {
                user: 'Darth Vader',
                text: 'Hallo'
            },
            {
                user: `${botPrefix}${randomBotEmoj()}`,
                text: randomBotMsg()
            },
            {
                user: 'Darth Vader',
                text: 'I am your father'
            },
            {
                user: `${botPrefix}${randomBotEmoj()}`,
                text: 'NOOOOOOOOO'
            }
          ],
        }
    }

    
    sendMessage = (e) => {
        this.setState ({
            msgArray: [...this.state.msgArray, {
              user: this.props.user,
              text: this.state.msg || ''
            }],
            msg: '' // clear input field
        })
    }

    handleChange = (e) => {
        e.keyCode === 13 ? this.sendMessage(e)
          : this.setState ({msg: e.target.value})
    }
    
    scrollToBottom = () => {console.log('scrollToBottom')
      const { messageList } = this.refs;
      messageList.scrollIntoView({ behavior: 'smooth', block: "end", inline: "nearest" })
    }

    componentDidMount() {
      this.scrollToBottom();
    }
    
    componentDidUpdate () {
        if (this.state.msgArray.length % 2 === 1) {
            setTimeout(() => {
                this.setState ({
                    msgArray: [...this.state.msgArray, 
                      {
                        user: `${botPrefix}${randomBotEmoj()}`,
                        text: randomBotMsg() 
                      }
                    ],
                    msg: ''
                })
            }, 500)
        }
        
        this.scrollToBottom()
    }
    
    render() {
        let { user, classes } = this.props
        
        const placeholder = `Введите текст нового сообщения`
        
        let MessagesArr = this.state.msgArray.map( (message, index, self) => 
          <Message
            sender={ message.user }
            text={ message.text }
            bot={ message.user.slice(0, botPrefix.length) === botPrefix } 
            self={ message.user === user }
            key={ index }
          />
        )
        
        return (
            <div className="msgs-body">
                
                <Box ref="messageList" className={`msgs-list ${classes.root}`}>
                    { MessagesArr }
                </Box>
                
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { this.messagesEnd = el; }}>
                </div>
                
                <Divider variant="middle" />
                    
                <Box className={`msgs-foot ${classes.foot}`}>
                        
                  <TextField
                    className="msg-input"
                    autoFocus
                    color="secondary"
                    variant = "filled"
                    placeholder = { placeholder }
                    onChange = { this.handleChange }
                    onKeyUp = { this.handleChange }
                    value = { this.state.msg || ''}
                    InputProps={{ className: classes.input }}
                  />
                  
                  <Fab
                    className={classes.hovered}
                    color="primary"
                    aria-label="add"
                    onClick = { this.sendMessage }
                  >
                    <Icon>send</Icon>
                  </Fab>

                </Box>
            </div>
                
        )

    }
}

export default withStyles(useStyles)(Messages);
