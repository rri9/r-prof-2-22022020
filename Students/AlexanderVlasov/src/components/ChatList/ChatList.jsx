import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const useStyles = (theme => ({
  active: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)'
  }
}));

class ChatList extends React.Component {
  static propTypes = {
    chatId: PropTypes.number,
  }
  static defaultProps = {
      chatId: 1
  }
  render() {
    const { classes } = this.props
    return (
      <div>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Создать чат" />
          </ListItem>
        </List>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folders">
          <Link to="/chat/1">
            <ListItem button className={ this.props.chatId === 1 ? classes.active : '' }>
              <ListItemText primary="Chat 1" />
            </ListItem>
          </Link>
          <Link to="/chat/2">
            <ListItem button className={ this.props.chatId === 2 ? classes.active : '' }>
              <ListItemText primary="Chat 2"/>
            </ListItem>
          </Link>
        </List>
      </div>
    )
  }
}

export default withStyles(useStyles)(ChatList)
