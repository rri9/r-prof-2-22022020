// FIX Исправить прокрутку на последнее сообщение 

import React from 'react';
import PropTypes from 'prop-types';
import socketIOclient from 'socket.io-client';
//redux
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import {
  sendMessage, delMessage, sendMessageSuccess, delMessageSuccess, 
} from '../../store/actions/messageActions.js';
import { blinkChat } from '../../store/actions/chatActions.js';
// UI
import {IconButton, TextField, Tooltip, CircularProgress } from '@material-ui/core';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import './MessageField.css';

import Message from '../Message/Message.jsx';

class MessageField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msgText: '',
    };
    this.msgTextInput = React.createRef()
    this.messageFieldEndRef = React.createRef();
    this.socket = socketIOclient('http://localhost:3300');
  }

  handleSendMsg = (message, senderId, sender) => {
    const { currentChatId, user } = this.props;
    this.props.sendMessage(message, senderId, sender, currentChatId, user.token);
    this.setState({
      msgText: '',
    });
  };

  handleDelMsg = (messageId) => {
    const { currentChatId, user } = this.props;
    this.props.delMessage(messageId, currentChatId, user._id, user.token);
  };

  handleChange = (evt) => {
    if (evt.keyCode === 13) {
      this.handleSendMsg(evt.target.value, this.props.user._id, this.props.user.name);
    } else if (evt.keyCode === 27) {
      this.setState({ [evt.target.name]: '' });
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

  getAllMsgsInChat(chats, currentChatId) {
    let msgs = [];
    if (!chats) {
      return [];
    }
    for (let i = 0; i < chats.length; i++) { //TODO arr.findIndex
      if (chats[i]._id === currentChatId) {
        msgs = chats[i].messages;
        break;
      };
    };
    return msgs;
  }

  getFilteredMsgsInChat(msgs, filterStr) {
    const regexp = new RegExp(filterStr);
    const msgsArr = [];
    msgs.forEach((msg) => {
      if (regexp.test(msg.text)) {
        msgsArr.push(msg);
      }
    });
    return msgsArr;
  }

  componentDidMount() {
    this.scrollToBottom();
    this.setFocusOnInput();
    
    this.socket.on('messageSend', msg => {
      if (msg.senderId !== this.props.user._id) {
        this.props.sendMessageSuccess(msg.messageId, msg.text, msg.senderId, msg.sender, msg.chatId);
        this.handleBlinkChat(msg.chatId);
      }
    });
    this.socket.on('messageDelete', msg => {
      if (msg.userId !== this.props.user._id) {
        this.props.delMessageSuccess(msg.messageId, msg.chatId);
      }
    })
  };

  componentDidUpdate(prevProps) {
    this.scrollToBottom();
    this.setFocusOnInput();
  };

  handleBlinkChat(chatId) {
    const { currentChatId } = this.props;
    if (chatId !== currentChatId) {
      this.props.blinkChat(chatId);
    }
  }

  render() {
    const { chats, currentChatId, searchText, isLoading, user,
      isMessageLoading, messageLoadingError } = this.props;
    const msgs = this.getAllMsgsInChat(chats, currentChatId);
    let currentChatMsgs = [];
    searchText === '' ?
      currentChatMsgs = msgs :
      currentChatMsgs = this.getFilteredMsgsInChat(msgs, searchText);
    let MessagesArr = [];
    if (currentChatMsgs.length) {
      MessagesArr = currentChatMsgs.map((msg) => (
        <Message
          key={msg._id.toString()}
          msg={msg}
          currentUserId={user._id}
          delMessage={this.handleDelMsg}
        />
      ));
    } else {
      MessagesArr = (
        <span className='center'>Сообщений нет...</span>
      );
    }
    return (
      <div className='message-field-wrapper'>
        <div className='message-field' ref={this.messageFieldEndRef}>
          {/* // TODO Выпилить лоадер в отдльный компонент */}
          { isLoading ? (
            <div className='loading-circle'>
              <CircularProgress />
            </div>
            )
          : MessagesArr}
          
          {isMessageLoading &&
            (
              <div className='loading-circle'>
                <CircularProgress />
              </div>
            )
          }

          { messageLoadingError ?? (<div>Ошибка отправки сообщения</div>) }
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
              onClick={() => this.handleSendMsg(this.state.msgText, user._id, user.name)}
              >
                <SendOutlinedIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    );
  }
}

MessageField.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  searchText: PropTypes.string,
  chats: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentChatId: PropTypes.string,
  isMessageLoading: PropTypes.bool.isRequired,
  messageLoadingError: PropTypes.string,
  user: PropTypes.object,
  sendMessage: PropTypes.func.isRequired,
  delMessage: PropTypes.func.isRequired,
  blinkChat: PropTypes.func.isRequired,
  sendMessageSuccess: PropTypes.func.isRequired,
  delMessageSuccess: PropTypes.func.isRequired,
}

const mapStateToProps = ({ chatReducers, userReducers }) => ({
  isLoading: chatReducers.isLoading,
  searchText: chatReducers.searchText,
  chats: chatReducers.chats,
  currentChatId: chatReducers.currentChatId,
  isMessageLoading: chatReducers.isMessageLoading,
  messageLoadingError: chatReducers.messageLoadingError,
  user: userReducers.user,

});

const mapDispatchToProps = dispatch => bindActionCreators({
  sendMessage,
  delMessage,
  blinkChat,
  sendMessageSuccess,
  delMessageSuccess,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageField);
