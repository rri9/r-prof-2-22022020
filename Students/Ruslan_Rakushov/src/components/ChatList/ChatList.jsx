// TODO Добавление чатов

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import AssistantIcon from '@material-ui/icons/Assistant';
import Divider from '@material-ui/core/Divider';

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
    };
  }
  handleListItemClick = (event, index) => {
    this.setState({
      selectedIndex: index,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Divider />
        <List>
          <Link to='/chat/1/'>
            <ListItem
            button
            selected={this.state.selectedIndex === 0}
            onClick={event => this.handleListItemClick(event, 0)}>
              <ListItemIcon className={classes.itemIcon}>
                <AssistantIcon />
              </ListItemIcon>
              <ListItemText primary='Chat 1'/>
            </ListItem>
          </Link>
          <Link to='/chat/2/'>
            <ListItem
            button
            selected={this.state.selectedIndex === 1}
            onClick={event => this.handleListItemClick(event, 1)}>
            <ListItemIcon className={classes.itemIcon}>
                <AssistantIcon />
              </ListItemIcon>
              <ListItemText primary='Chat 2'/>
            </ListItem>
          </Link>
          <Link to='/chat/3/'>
            <ListItem
            button
            selected={this.state.selectedIndex === 2}
            onClick={event => this.handleListItemClick(event, 2)}>
            <ListItemIcon className={classes.itemIcon}>
                <AssistantIcon />
              </ListItemIcon>
              <ListItemText primary='Chat 3'/>
            </ListItem>
          </Link>
        </List>
        <Divider />
      </div>
    );
  };
}

export default withStyles(useStyles)(ChatList);