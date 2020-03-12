import React, { Component } from 'react';
import ReactDom from 'react-dom';

import
{ Box,
  Divider,
  TextField,
  Input,
  FloatingActionButton,
  Fab,
  Icon } from '@material-ui/core';

import Message from '../Message/Message.jsx'

import { withStyles } from '@material-ui/core/styles';
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

import botData from './botData.json';
const randomBotData = () => Math.floor(Math.random() * botData.emoji.length);
const randomBotEmoj = () => String.fromCodePoint(botData.emoji[randomBotData()]);
const randomBotMsg = () => botData.msg[randomBotData()];
const botPrefix = 'bot :: ';

const scrolledId = 'scrolled_msg';

import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";

class Messages extends Component {
    static propTypes = {
      chatId: PropTypes.number.isRequired,
      chats: PropTypes.object.isRequired,
      messages: PropTypes.object.isRequired,
      sendMessage: PropTypes.func.isRequired,
    };
    
    constructor(props) {
        super(props);
        
        this.scrolledEl = null;
        
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
        };
    };

    sendMessage = (e) => {
        this.setState ({
            msgArray: [...this.state.msgArray, {
              user: this.props.user,
              text: this.state.msg || ''
            }],
            msg: '' // clear input field
        });
    };

    handleChange = (e) => {
        e.keyCode === 13 ? this.sendMessage(e)
          : this.setState ({msg: e.target.value})
    };
    
    scrollToBottom = () => {
      if(this.scrolledEl) 
        this.scrolledEl.scrollIntoView();
    };

    componentDidMount() {
      this.scrolledEl = document.getElementById(scrolledId);
      this.scrollToBottom();
    };
    
    componentDidUpdate(prevProps, prevState) {
        if(prevState.msgArray.length < this.state.msgArray.length
          &&
          this.state.msgArray.length % 2 === 1)
          {
              setTimeout(() => {
                  this.setState ({
                      msgArray: [...this.state.msgArray, 
                        {
                          user: `${botPrefix}${randomBotEmoj()}`,
                          text: randomBotMsg() 
                        }
                      ],
                      msg: ''
                  });
              }, 500)
          };
        
        this.scrollToBottom();
    }
    
    render() {
        let { user, classes } = this.props;
        
        const placeholder = `Новое сообщение ...`;
        
        let MessagesArr = this.state.msgArray.map( (message, index, self) => 
          <Message
            sender={ message.user }
            text={ message.text }
            bot={ message.user.slice(0, botPrefix.length) === botPrefix } 
            self={ message.user === user }
            key={ index }
          />
        );
        
        return (
            <div className="msgs-body">
                
                <Box ref="messageList" className={ `msgs-list ${classes.root}` }>
                    { MessagesArr }
                    <div id={ scrolledId } />
                </Box>
                
                <Divider variant="middle" />
                    
                <Box className={ `msgs-foot ${classes.foot}` }>
                        
                  <TextField
                    className="msg-input"
                    autoFocus
                    color="secondary"
                    variant = "filled"
                    placeholder = { placeholder }
                    onChange = { this.handleChange }
                    onKeyUp = { this.handleChange }
                    value = { this.state.msg || '' }
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
        );
    };
};

const mapStateToProps = ({ chatsReducer }) => ({
  chats: chatsReducer.chats
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({}, dispatch);

export default
  connect(mapStateToProps, mapDispatchToProps)
    (withStyles(useStyles)(Messages));