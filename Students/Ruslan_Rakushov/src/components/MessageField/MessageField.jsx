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
    //TODO Scroll to bottom
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
  }
  //methods
  sendMsg = () => {
    // const msg = document.querySelector('#msg'); //Так плохо, потому что не логично обращаться к DOM напрямую!!!
    this.setState ({
      msgs : [...this.state.msgs, {
        sender: 'Me',
        text: this.state.msgText,
      }],
      msgText: '',
    });
  };
  handleChange = (evt) => {
    if (evt.keyCode !== 13) {
      this.setState({ msgText: evt.target.value });
    } else {
      this.sendMsg();
    }
  };

  //hooks
  componentDidUpdate() {
    //Отвечаем на каждое нечетное сообщение через 1 сек
    if(this.state.msgs.length %2 === 1) {
      setTimeout(() => {
        this.setState({
          msgs: [...this.state.msgs, {
            sender: null,
            text: 'Leave me alone, human...',
          }]
        });
      }, 100);
    }
  }

  render() {
    const { classes } = this.props;
    let MessagesArr = this.state.msgs.map((msg, index) => <Message key={index.toString()} msg={msg} />);
    return (
      <div className="wrapper">
        <div className={classes.root}>
          { MessagesArr }
        </div>
        <div className={classes.sendMsgField}>
          <Tooltip title="Введите текст сообщения">
            <TextField
              className={classes.sendText}
              variant="outlined"
              size="small"
              onChange={this.handleChange}
              onKeyUp = {this.handleChange}
              value = {this.state.msgText}
              />
          </Tooltip>
          <Tooltip title="Отправить">
            <IconButton 
              className={classes.sendBtn}
              // size="small"
              name="sendMsgUI"
              onClick={this.sendMsg}>
                <SendOutlinedIcon />
              </IconButton>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(MessageField);