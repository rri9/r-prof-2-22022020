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
      msgs: props.msgs,
    };
    this.msgTextInput = React.createRef()
    this.messageFieldEndRef = React.createRef();
  }
  //methods
  sendMsg = (message) => {
    // const msg = document.querySelector('#msg'); //Так плохо, потому что не логично обращаться к DOM напрямую!!!
    this.setState ({
      msgs : [...this.state.msgs, {
        sender: 'Me',
        text: message,
      }],
      msgText: '',
    });
  };
  handleChange = (evt) => {
    if (evt.keyCode !== 13) {
      this.setState({ [evt.target.name]: evt.target.value });
    } else {
      this.sendMsg(evt.target.value);
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

  componentDidUpdate() {
    //Отвечаем на каждое нечетное сообщение через 0.1 сек
    if(this.state.msgs[this.state.msgs.length-1].sender === 'Me') {
      setTimeout(() => {
        this.setState({
          msgs: [...this.state.msgs, {
            sender: null,
            text: 'Leave me alone, human...',
          }]
        });
      }, 1000);
    }
    this.scrollToBottom();
  };

  render() {
    const { classes } = this.props;
    let MessagesArr = this.state.msgs.map((msg, index) => <Message key={index.toString()} msg={msg} />);
    return (
      <div className={classes.wrapper}>
        <div className={classes.root} ref={this.messageFieldEndRef}>
          { MessagesArr }
        </div>
        <div className={classes.sendMsgField}>
          <Tooltip title = "Введите текст сообщения">
            <TextField
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
              onClick={() => this.sendMsg(this.state.msgText)}>
                <SendOutlinedIcon />
              </IconButton>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(MessageField);