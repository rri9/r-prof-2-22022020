import React, { Component } from 'react';
//import ReactDom from 'react-dom';

import { sendMessage } from "../../store/actions/messages_actions";

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

// import botData from './botData.json';
// const randomBotData = () => Math.floor(Math.random() * botData.emoji.length);
// const randomBotEmoj = () => String.fromCodePoint(botData.emoji[randomBotData()]);
// const randomBotMsg = () => botData.msg[randomBotData()];
const scrolledId = 'scrolled_msg';

import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";

class Messages extends Component {
    static propTypes = {
      chatId: PropTypes.number.isRequired,
      chats: PropTypes.object.isRequired,
      sendMessage: PropTypes.func.isRequired,
    };
    
    constructor(props) {
        super(props);
        
        this.scrolledEl = null;
        //this.botPrefix = `${this.props.chats[this.props.chatId].bot} :: `;

        this.state = {
          msgArray: this.props.chats[this.props.chatId].msgList.map((msg, index) => {
            return {
              msgId: index + 1,
              sender: msg.sender || `${this.props.chats[this.props.chatId].bot}`,
              text: msg.text || String.fromCodePoint(0x1F47D)
            }
          })
        };
    };

    _sendMessage = (e) => {
      this.props.sendMessage(
        this.props.chatId,
        this.state.msgArray.length + 2,
        this.props.chats[this.props.chatId].user,
        this.state.msg || ''
      )
      this.setState ({
          msgArray: [...this.state.msgArray, {
            msgId: this.state.msgArray.length + 2,
            sender: this.props.chats[this.props.chatId].user,
            text: this.state.msg || ''
          }],
          msg: '' // clear input field
      });
    };

    handleChange = (e) => {
      e.keyCode === 13 ? this._sendMessage(e)
        : this.setState ({msg: e.target.value});
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
      // if(prevState.msgArray.length < this.state.msgArray.length
        // &&
        // this.state.msgArray.length % 2 === 1)
        // {
            // setTimeout(() => {
                // this.setState ({
                    // msgArray: [...this.state.msgArray, 
                      // {
                        // msgId: this.state.msgArray.length + 2,
                        // sender: `${this.botPrefix}${randomBotEmoj()}`,
                        // text: randomBotMsg() 
                      // }
                    // ],
                    // msg: ''
                // });
            // }, 500)
        // };
      
      this.scrollToBottom();
    }
    
    render() {
      let { sender } = this.props.chats[this.props.chatId],
        { classes } = this.props;

        const placeholder = `Новое сообщение ...`;
      
      let MessagesArr = this.state.msgArray.map( message =>
        <Message
          sender={ message.sender }
          text={ message.text }
          //bot={ message.sender.slice(0, this.botPrefix.length) === this.botPrefix } 
          bot={ message.sender.slice(0, this.props.chats[this.props.chatId].bot.length) === this.props.chats[this.props.chatId].bot } 
          self={ message.sender === this.props.chats[this.props.chatId].user }
          key={ message.msgId }
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
                  onClick = { this._sendMessage }
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
  bindActionCreators({ sendMessage }, dispatch);

export default
  connect(mapStateToProps, mapDispatchToProps)
    (withStyles(useStyles)(Messages));