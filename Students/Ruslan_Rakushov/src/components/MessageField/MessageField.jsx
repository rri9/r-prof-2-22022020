import React, {Component} from 'react';
import ReactDom from 'react-dom';

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
      chats: props.chats,
      msgs: props.msgs,
    };
    this.msgTextInput = React.createRef()
    this.messageFieldEndRef = React.createRef();
  }
  //methods
  sendMsg = (message, sender) => {
    const chatId = this.props.chatId;
    const { chats, msgs } = this.state;
    const msgId = Object.keys(msgs).length + 1;
    this.setState({
      msgs: { ...msgs, 
        [msgId]: {
          sender: sender,
          text: message,
        }
      },
      chats: { ...chats,
        [chatId]: { ...chats[chatId],
          msgsList: [...chats[chatId]['msgsList'], msgId],
        }
      },
      msgText: '',
    });
  };
  handleChange = (evt) => {
    if (evt.keyCode === 13) {
      this.sendMsg(evt.target.value, 'Me');
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

  //hooks
  componentDidMount() {
    this.scrollToBottom();
    this.setFocusOnInput();
  };

  componentDidUpdate(prevProps, prevState) {
    const { chats: prevChats, msgs: prevMsgs } = prevState;
    const { chats, msgs } = this.state;
    const chatId = this.props.chatId;
    const prevMsgsLength = Object.keys(prevChats[chatId].msgsList).length;
    const msgsLength = Object.keys(chats[chatId].msgsList).length;
    const chatMsgsListLastIndex = chats[chatId].msgsList.length - 1;
    const chatMsgLastIndex = chats[chatId].msgsList[chatMsgsListLastIndex];
    if (prevMsgsLength < msgsLength &&
      msgs[chatMsgLastIndex].sender === 'Me') {
      setTimeout(() => {
        const text = 'Leave me alone, human...';
        const sender = 'Bot';
        this.sendMsg(text, sender);
      }, 1000);
    }
    this.scrollToBottom();
    this.setFocusOnInput();
  };

  render() {
    const { classes } = this.props;
    const { msgs, chats } = this.state;
    const { chatId } = this.props;
    const MessagesArr = chats[chatId].msgsList.map((msgId, index) => (
      <Message key={index.toString()} msg={msgs[msgId]} />
    ));
    return (
      <div className={classes.wrapper}>
        <div className={classes.root} ref={this.messageFieldEndRef}>
          { MessagesArr }
        </div>
        <div className={classes.sendMsgField}>
          <Tooltip title = "Введите текст сообщения">
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
          </Tooltip>
          <Tooltip title="Отправить">
            <IconButton 
              className={classes.sendBtn}
              // size="small"
              name="sendMsgUI"
              onClick={() => this.sendMsg(this.state.msgText, 'Me')}>
                <SendOutlinedIcon />
              </IconButton>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(MessageField);