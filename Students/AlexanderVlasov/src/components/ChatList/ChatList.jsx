import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';

import { Link, withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles, TextField, GridList } from '@material-ui/core';

const useStyles = (theme => ({
  active: {
    '&:hover, &:active' : {
      color:  theme.pallete.primary.light,
      backgroundColor: theme.pallete.primary.dark
    },
    color:  theme.pallete.primary.light,
    backgroundColor: theme.pallete.primary.dark
  },
  listItem: {
    '&:hover, &:active' : {
      color:  theme.pallete.primary.light,
      backgroundColor: theme.pallete.primary.dark
    }
  },
  list: {
    overflow: 'auto',
    maxHeight: 'calc(100vh - 152px)',
  }
}));

import { addChat } from '../../store/actions/chats_action.js';
import { addMessageId } from '../../store/actions/messages_action.js';

import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

import { push } from 'connected-react-router';

class ChatList extends React.Component {
  static propTypes = {
    chats: PropTypes.object.isRequired
  }
  static defaultProps = {
    chatId: 1
  }
  state = {
    newChatTitle: ''
  }

  handleChanges = (event) => {
    event.keyCode !== 13 ?
        this.setState({newChatTitle: event.target.value}) :
        this.addChat();
  }

  handleNavigate = (link) => {
    this.props.history.push(link);
  }

  addChat = () => {
    this.props.addChat(this.state.newChatTitle);
    this.setState({newChatTitle: ''});
  }

  render() {
    const { classes, chats, match: { params } } = this.props;
    console.log(this.props);
    const renderedChats = Object.keys(chats).map((key) => {
      return (
          <ListItem 
            button 
            className={ params.chatId === key ? classes.active : classes.listItem }
            onClick={ () => this.handleNavigate(`/chat/${key}`) }>
            <ListItemText primary={ chats[key].title } />
          </ListItem>
      )
    })
    return (
      <div className={ classes.container }>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <TextField
              className="flex-grow-1"
              label="Новый чат"
              variant="outlined"
              value={this.state.newChatTitle}
              onChange={this.handleChanges}
              onKeyUp={this.handleChanges}
            />
          </ListItem>
        </List>
        <Divider />
        <List className={ classes.list }>
          { renderedChats }
        </List>
      </div>
    )
  }
}

const mapStateToProps = ({ chatsReducer }) => ({
  chats: chatsReducer.chats
});
const mapDispatchToProps = dispatch => bindActionCreators({ addChat, addMessageId }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(withRouter(ChatList)))
