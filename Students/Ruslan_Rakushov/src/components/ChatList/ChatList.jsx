import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  List, ListItem, ListItemText, ListItemIcon, TextField,
  Divider, Tooltip, IconButton, 
} from '@material-ui/core';
import AssistantIcon from '@material-ui/icons/Assistant';
import AddIcon from '@material-ui/icons/Add';

//redux
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { addChat } from '../../store/actions/chatActions.js';

const useStyles = (theme => ({
  root: {
    width: '30vh',
    marginTop: '70px',
  },
  itemIcon: {
    minWidth: '35px',
  },
}));

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: this.props.selectedIndex,
      newChatName: '',
    };
    this.chats = this.props.chats;
  }
  handleListItemClick = (event, index) => {
    this.setState({
      selectedIndex: index,
    });
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

  render() {
    const { classes } = this.props;
    const { chats } = this.props;
    const listsArr = [];
    for (let i in chats) {
      if (chats.hasOwnProperty(i)) {
        listsArr.push(
          <Link to={`/chat/${i}/`} key={i}>
            <ListItem
            button
            selected={this.state.selectedIndex === (i-1) }
            onClick={event => this.handleListItemClick(event, i-1)}>
              <ListItemIcon className={classes.itemIcon}>
                <AssistantIcon />
              </ListItemIcon>
              <ListItemText primary={`${chats[i].title}`}/>
            </ListItem>
          </Link>
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
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addChat,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(ChatList));
