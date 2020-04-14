import React from 'react';
import PropTypes from 'prop-types';
import { push } from "connected-react-router";

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
import { loadChats, addChat, delChat, setCurrentChatId } from '../../store/actions/chatActions.js';

import './ChatList.css';

class ChatList extends React.Component {
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
    } else if (evt.keyCode === 27) {
      this.setState({ [evt.target.name]: '' });
    } else {
      this.setState({ [evt.target.name]: evt.target.value });
    }
  };
  handleNewChat = (title) => {
    this.props.addChat(title, this.props.user.token);
    this.setState({
      newChatName: '',
    });
  };
  handleDelItemClick = (event, id) => {
    event.stopPropagation();
    this.props.delChat(id, this.props.user.token);
  };

  componentDidMount() {
    this.props.loadChats(this.props.user.token);
  }
  // componentDidUpdate(prevProps, prevState) {
  //   //TODO Вынести в отдельную функцию мигание чата
  //   if(this.props.chatWithNewMsg) {
  //     setTimeout(() => {
  //       this.props.blinkChat(null);
  //     }, 1500);
  //   }
  // };

  render() {
    const { chats, currentChatId, isLoading, chatsLoadingError, chatMessage } = this.props;
    const listsArr = [];
    if (!!chats || chats.length > 0) {
      chats.forEach(chat => {
        // const blinkClass = chatWithNewMsg === chat._id ? 'blink' : '';
        const blinkClass = ''; //FIX 
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
  loadChats: PropTypes.func,
  user: PropTypes.object,
}

ChatList.defaultProps = {
}

const mapStateToProps = ({ chatReducers, userReducers }) => ({
  chats: chatReducers.chats,
  isLoading: chatReducers.isLoading,
  chatsLoadingError: chatReducers.chatsLoadingError,
  currentChatId: chatReducers.currentChatId,
  chatMessage: chatReducers.chatMessage,
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
  },
  dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
