//TODO Switch to new chat after adding it

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { push } from "connected-react-router";
import { withStyles } from '@material-ui/core/styles';
import {
  List, ListItem, ListItemText, ListItemIcon, TextField,
  Divider, Tooltip, IconButton, 
} from '@material-ui/core';
import AssistantIcon from '@material-ui/icons/Assistant';
import AddIcon from '@material-ui/icons/Add';
import DelIcon from '@material-ui/icons/Delete';

//redux
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { addChat, delChat, blinkChat, setCurrentChatId } from '../../store/actions/chatActions.js';

import './ChatList.css';

const useStyles = (theme => ({
  root: {
    width: '30vh',
    minWidth: '200px',
    marginTop: '70px',
  },
  itemIcon: {
    minWidth: '35px',
  },
  delIcon: {
    minWidth: '30px',
  }
}));

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newChatName: '',
    };
  }
  handleListItemClick = (index) => {
    this.props.setCurrentChatId(index);
    this.props.push(`/chat/${index}/`);
  };
  handleChange = (evt) => {
    if (evt.keyCode === 13) {
      this.handleNewChat(evt.target.value);
    } else {
      this.setState({ [evt.target.name]: evt.target.value });
    }
  };
  handleNewChat = (title) => {
    this.props.addChat(title);
    this.setState({
      newChatName: '',
    });
  };
  handleDelItemClick = (event, index) => {
    event.stopPropagation();
    this.props.delChat(index);
  };

  componentDidUpdate(prevProps, prevState) {
    if(this.props.chatWithNewMsg) {
      setTimeout(() => {
        this.props.blinkChat(null);
      }, 1500);
    }
  };

  render() {
    const { classes } = this.props;
    const { chats } = this.props;
    let { currentChatId } = this.props;
    const listsArr = [];
    for (let i in chats) {
      i = +i;
      currentChatId = +currentChatId;
      const blinkClass = this.props.chatWithNewMsg == i ? 'blink' : '';
      if (chats.hasOwnProperty(i)) {
        listsArr.push(
            <ListItem
            className={blinkClass}
            button
            selected={currentChatId === (i) }
            onClick={() => this.handleListItemClick(i)}
            key={i}
            disableGutters>
              <ListItemIcon className={classes.itemIcon}>
                <AssistantIcon />
              </ListItemIcon>
                <ListItemText primary={`${chats[i].title}`} />
              <ListItemIcon
              className={classes.delIcon}
              onClick={(evt) => this.handleDelItemClick(evt, i)}>
                <DelIcon />
              </ListItemIcon>
            </ListItem>
        );
      }
    }

    return (
      <div className={classes.root}>
        <Divider />
        <List>
          { listsArr }
          <Divider />
          <ListItem>
            <TextField
              placeholder='Добавить чат'
              name='newChatName'
              value={this.state.newChatName}
              variant = "outlined"
              size = "small"
              onChange = {this.handleChange}
              onKeyUp = {this.handleChange}
            />
            <Tooltip title="Добавить чат">
            <IconButton 
              className={classes.addBtn}
              name="addChatUI"
              onClick={() => this.handleNewChat(this.state.newChatName)}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          </ListItem>
        </List>
        <Divider />
      </div>
    );
  };
}

const mapStateToProps = ({ chatReducer }) => ({
  chats: chatReducer.chats,
  chatWithNewMsg: chatReducer.chatWithNewMsg,
  currentChatId: chatReducer.currentChatId,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    addChat,
    delChat,
    blinkChat,
    push,
    setCurrentChatId,
  },
  dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(ChatList));
