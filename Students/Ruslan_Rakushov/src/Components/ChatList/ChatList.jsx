import React from 'react';
import PropTypes from 'prop-types';
import { push } from "connected-react-router";
import socketIOclient from 'socket.io-client';

// UI
import {
  List, ListItem, ListItemText, ListItemIcon, TextField,
  Divider, Tooltip, IconButton, CircularProgress, 
} from '@material-ui/core';
import AssistantIcon from '@material-ui/icons/Assistant';
import AddIcon from '@material-ui/icons/Add';
import DelIcon from '@material-ui/icons/Delete';

//redux
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import {
  loadChats, addChat, delChat, setCurrentChatId,
  addChatSuccess, delChatSuccess, blinkChat,
} from '../../store/actions/chatActions.js';

import './ChatList.css';

class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newChatName: '',
    };
    this.socket = socketIOclient('http://localhost:3300');
  }
  handleListItemClick = (index) => {
    this.props.setCurrentChatId(index);
    this.props.push(`/chat/${index}/`);
  };
  handleChange = (evt) => {
    if (evt.keyCode === 13) {
      this.handleNewChat(evt.target.value);
    } else if (evt.keyCode === 27) {
      this.setState({ [evt.target.name]: '' });
    } else {
      this.setState({ [evt.target.name]: evt.target.value });
    }
  };
  handleNewChat = (title) => {
    this.props.addChat(title, this.props.user._id, this.props.user.token);
    this.setState({
      newChatName: '',
    });
  };
  handleDelItemClick = (event, id) => {
    event.stopPropagation();
    this.props.delChat(id, this.props.user._id, this.props.user.token);
  };

  componentDidMount() {
    this.props.loadChats(this.props.user.token);
    this.socket.on('chatAdd', chat => {
      if (chat.userId !== this.props.user._id) {
        this.props.addChatSuccess(chat.chatId, chat.title);
        this.props.blinkChat(chat.chatId);
      }
    });
    this.socket.on('chatDel', chat => {
      if (chat.userId !== this.props.user._id) {
        this.props.setCurrentChatId('');
        this.props.delChatSuccess(chat.chatId, '');
      }
    })
  }

  render() {
    const {
      chats, currentChatId, isLoading, chatsLoadingError, chatsWithNewMsg, chatMessage
    } = this.props;
    const listsArr = [];
    if (!!chats || chats.length > 0) {
      chats.forEach(chat => {
        let shouldBlink = chatsWithNewMsg.includes(chat._id);
        const blinkClass = shouldBlink ? 'blink' : '';
        listsArr.push(
          <ListItem
            className={blinkClass}
            button
            selected={currentChatId === chat._id}
            onClick={() => this.handleListItemClick(chat._id)}
            key={chat._id}
            disableGutters
          >
              <ListItemIcon className='item-icon'>
                <AssistantIcon />
              </ListItemIcon>
              <ListItemText primary={`${chat.title}`} />
              <ListItemIcon
                className='del-icon'
                onClick={(evt) => this.handleDelItemClick(evt, chat._id)}>
                <DelIcon />
              </ListItemIcon>
          </ListItem>
        );
      });
    };

    return (
      <div className='chat-list'>
        <Divider />
        <List>
          {isLoading &&
            (
              <div className='loading-circle'>
                <CircularProgress />
              </div>
            )
          }
          {chatsLoadingError ?
            (<div>Ошибка загрузки чатов</div>) 
            :
            (listsArr.length) ? listsArr : <div>Чатов пока нет...</div> 
          }
          
          {/* //TODO Убирать через n сек. {chatMessage && <div>{chatMessage}</div>} */}
          <Divider />
          <ListItem>
            <TextField
              className='chat-list-item'
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
              className='add-btn'
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

ChatList.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool,
  chatsLoadingError: PropTypes.string,
  currentChatId: PropTypes.string,
  chatMessage: PropTypes.string,
  chatsWithNewMsg: PropTypes.array,
  loadChats: PropTypes.func,
  user: PropTypes.object,
  addChatSuccess: PropTypes.func,
  delChatSuccess: PropTypes.func,
  blinkChat: PropTypes.func,
}

ChatList.defaultProps = {
}

const mapStateToProps = ({ chatReducers, userReducers }) => ({
  chats: chatReducers.chats,
  isLoading: chatReducers.isLoading,
  chatsLoadingError: chatReducers.chatsLoadingError,
  currentChatId: chatReducers.currentChatId,
  chatMessage: chatReducers.chatMessage,
  chatsWithNewMsg: chatReducers.chatsWithNewMsg,
  user: userReducers.user,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loadChats,
    addChat,
    delChat,
    // blinkChat,
    push,
    setCurrentChatId,
    addChatSuccess,
    delChatSuccess,
    blinkChat,
  },
  dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
