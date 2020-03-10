//FIX Отображение пустого чата (3й например)
import React, { Component } from 'react';
import ReactDom from 'react-dom';

//redux
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { sendMessage } from '../../store/actions/messageActions.js';

import Message from '../Message/Message.jsx';

//UI Components
import { withStyles } from '@material-ui/core/styles';
import {IconButton, TextField, Tooltip } from '@material-ui/core';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';

const useStyles = (theme => ({
  wrapper: {
    width: '70vh',
    marginTop: '70px',
    // TODO height 70vh (в body или верхний контейнер 100vh,
    //  дальше вложенным делаем свои или 100.
    //  еще можно футером прибить (см.какое-то свойство css)
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '75vh',
    padding: '5px',
    border: '1px solid grey',
    borderRadius: '5px',
    backgroundColor: 'lightgrey',
    boxSizing: 'border-box',
    overflowY: 'auto',
  },
  sendMsgField: {
    width: '400px',
    margin: '10px 0px',
    display: 'flex',
  },
  sendText: {
    width: 'inherit',
  },
  sendBtn: {
    padding: '8px',
  },
}));

class MessageField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msgText: '',
      chats: props.chats, //FIX
    };
    this.sendMessage = this.props.sendMessage; //Функция из messageActions
    this.msgTextInput = React.createRef()
    this.messageFieldEndRef = React.createRef();
  }
  //methods
  handleSendMsg = (message, sender) => {
    const {msgs, chatId} = this.props;
    const msgId = Object.keys(msgs).length + 1;
    sendMessage(msgId, sender, message, chatId);
    this.setState({
      chats: { ...chats,
        [chatId]: { ...chats[chatId],
          msgsCount: chats[chatId].msgsCount++,
        }
      },
      msgText: '',
    });
  };
  handleChange = (evt) => {
    if (evt.keyCode === 13) {
      this.handleSendMsg(evt.target.value, 'Me');
    } else {
      this.setState({ [evt.target.name]: evt.target.value });
    }
  };
  scrollToBottom = () => {
    this.messageFieldEndRef.current.lastElementChild.scrollIntoView({ behavior: 'smooth' });
  };
  setFocusOnInput = () => {
    this.msgTextInput.current.focus();
  }
  
  getLastMsgInChat(chatId, msgsObj) {
    for (let i = Object.keys(msgsObj).length; i > 0; i--) {
      if (msgsObj[i].chatId === chatId) {
        return msgsObj[i];
      }
    }
  }
  getAllMsgsInChat(chatId, msgsObj) {
    const msgsArr = [];
    // for (let i = 1; i <= Object.keys(msgsObj).length; i++) {
    //   if (msgsObj[i].chatId === chatId) {
    //     msgsArr.push(msgsObj[i]);
    //   }
    // }
    //lets try smth else =)
    for (let i in msgsObj) {
      if (msgsObj.hasOwnProperty(i) && msgsObj[i].chatId === chatId) {
        msgsArr.push(msgsObj[i]);
      }
    }
    return msgsArr;
  }

  //hooks
  componentDidMount() {
    this.scrollToBottom();
    this.setFocusOnInput();
  };

  componentDidUpdate(prevProps, prevState) {
    const { chatId } = this.props;
    if (prevState.chats[chatId].msgsCount > this.state.chats[chatId].msgsCount && 
      this.getLastMsgInChat(this.props.chatId, this.props.msgs).sender === 'Me') {
        setTimeout(() => {
          const text = 'Leave me alone, human...';
          const sender = 'Bot';
          this.handleSendMsg(text, sender);
        }, 1000);
      }
    this.scrollToBottom();
    this.setFocusOnInput();
  };

  render() {
    const { classes } = this.props;
    const { msgs, chatId } = this.props;
    const currentChatMsgs = this.getAllMsgsInChat(chatId, msgs);
    const MessagesArr = currentChatMsgs.map((msg, index) => (
      <Message key={index.toString()} msg={msg} />
    ));
    return (
      <div className={classes.wrapper}>
        <div className={classes.root} ref={this.messageFieldEndRef}>
          { MessagesArr }
        </div>
        <div className={classes.sendMsgField}>
          <TextField
            placeholder = 'Введите сообщение...'
            inputRef = {this.msgTextInput}
            className = {classes.sendText}
            variant = "outlined"
            size = "small"
            onChange = {this.handleChange}
            onKeyUp = {this.handleChange}
            value = {this.state.msgText}
            name = 'msgText'
            />
          <Tooltip title="Отправить">
            <IconButton 
              className={classes.sendBtn}
              // size="small"
              name="sendMsgUI"
              onClick={() => this.handleSendMsg(this.state.msgText, 'Me')}>
                <SendOutlinedIcon />
              </IconButton>
          </Tooltip>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ messageReducer }) => ({
  msgs: messageReducer.msgs,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  sendMessage,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(MessageField));