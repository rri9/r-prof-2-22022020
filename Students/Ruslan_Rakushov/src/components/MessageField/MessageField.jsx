import React, { Component } from 'react';
import ReactDom from 'react-dom';

//redux
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { sendMessage, delMessage, loadMessages } from '../../store/actions/messageActions.js';

import Message from '../Message/Message.jsx';

//UI Components
import { withStyles } from '@material-ui/core/styles';
import {IconButton, TextField, Tooltip, CircularProgress } from '@material-ui/core';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';

import './MessageField.css';

const useStyles = (theme => ({}));

class MessageField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msgText: '',
    };
    this.msgTextInput = React.createRef()
    this.messageFieldEndRef = React.createRef();
  }
  //methods
  handleSendMsg = (message, sender) => {
    const { currentChatId } = this.props;
    this.props.sendMessage(sender, message, currentChatId);
    this.setState({
      msgText: '',
    });
  };

  handleDelMsg = (dataId) => {
    this.props.delMessage(dataId);
  };

  handleChange = (evt) => {
    if (evt.keyCode === 13) {
      this.handleSendMsg(evt.target.value, this.props.profile.userName);
    } else {
      this.setState({ [evt.target.name]: evt.target.value });
    }
  };
  scrollToBottom = () => {
    if (this.messageFieldEndRef.current.lastElementChild) {
      this.messageFieldEndRef.current.lastElementChild.scrollIntoView({ behavior: 'smooth' });
    }
  };
  setFocusOnInput = () => {
    if (this.msgTextInput.current) {
      this.msgTextInput.current.focus();
    }
  }
  //FIX для static_api
  getAllMsgsInChat(chatId, msgsObj) {
    const msgsArr = [];
    for (let i in msgsObj) {
      if (msgsObj.hasOwnProperty(i) && msgsObj[i].chatId === chatId) {
        msgsArr.push({...msgsObj[i], id: i});
      }
    }
    return msgsArr;
  }

  getAllMsgsInChatDB(chatId, msgs) {
    const msgsArr = [];
    msgs.forEach((msg) => {
      if (msg.chatId === chatId) {
        msgsArr.push(msg);
      }
    });
    return msgsArr;
  }

  //FIX для static_api
  getFilteredMsgsInChat(chatId, msgsObj, filterStr) {
    const regexp = new RegExp(filterStr);
    const msgsArr = [];
    for (let i in msgsObj) {
      if (msgsObj.hasOwnProperty(i)
        && msgsObj[i].chatId === chatId
        && regexp.test(msgsObj[i].text)) {
        msgsArr.push({...msgsObj[i], id: i});
      }
    }
    return msgsArr;
  }
  
  getFilteredMsgsInChatDB(chatId, msgs, filterStr) {
    const regexp = new RegExp(filterStr);
    const msgsArr = [];
    msgs.forEach((msg) => {
      if (msg.chatId === chatId && regexp.test(msg.text)) {
        msgsArr.push(msg);
      }
    });
    return msgsArr;
  }

  //hooks
  componentDidMount() {
    this.props.loadMessages();
    this.scrollToBottom();
    this.setFocusOnInput();
  };

  componentDidUpdate(prevProps, prevState) {
      this.scrollToBottom();
      this.setFocusOnInput();
  };

  render() {
    const { classes } = this.props;
    const { msgs, currentChatId, searchText, isLoading } = this.props;
    let currentChatMsgs = [];
    searchText === '' ?
      // For static api
      // currentChatMsgs = this.getAllMsgsInChat(currentChatId, msgs) :
      // currentChatMsgs = this.getFilteredMsgsInChat(currentChatId, msgs, searchText);
      currentChatMsgs = this.getAllMsgsInChatDB(currentChatId, msgs) :
      currentChatMsgs = this.getFilteredMsgsInChatDB(currentChatId, msgs, searchText);
    let MessagesArr = [];
    if (currentChatMsgs.length) {
      MessagesArr = currentChatMsgs.map((msg, index) => (
        <Message
          key={index.toString()}
          msg={msg}
          userName={this.props.profile.userName}
          delMessage={this.handleDelMsg}
        />
      ));
    } else {
      MessagesArr = (
        <span>Сообщений пока нет...</span>
      );
    }
    return (
      <div className='message-field-wrapper'>
        <div className='message-field' ref={this.messageFieldEndRef}
        >
          { isLoading ? (
            <div className='loading-circle'>
              <CircularProgress />
            </div>
          )
          : MessagesArr }
        </div>
        <div className='send-msg-field'>
          <TextField
            autoComplete='off'
            placeholder = 'Введите сообщение...'
            inputRef = {this.msgTextInput}
            className = 'send-text'
            variant = "outlined"
            size = "small"
            onChange = {this.handleChange}
            onKeyUp = {this.handleChange}
            value = {this.state.msgText}
            name = 'msgText'
            />
          <Tooltip title="Отправить">
            <IconButton 
              className='send-btn'
              name="sendMsgUI"
              onClick={() => this.handleSendMsg(this.state.msgText, this.props.profile.userName)}
            >
                <SendOutlinedIcon />
              </IconButton>
          </Tooltip>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ messageReducer, chatReducer, profileReducer }) => ({
  msgs: messageReducer.msgs,
  isLoading: messageReducer.isLoading,
  searchText: messageReducer.searchText,
  chats: chatReducer.chats,
  currentChatId: chatReducer.currentChatId,
  profile: profileReducer.profile,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  sendMessage,
  delMessage,
  loadMessages,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(MessageField));