import React, {Component} from 'react';
import ReactDom from 'react-dom';
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
      selectedIndex: 0,
    };
  }
  handleListItemClick = (event, index) => {
    console.log('this.selectedIndex before: ', this.state.selectedIndex);
    this.setState({
      selectedIndex: index,
    });
    console.log('handleListItemClick:', index);
    console.log('this.selectedIndex after: ', this.state.selectedIndex);
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Divider />
        <List>
          <ListItem
          button
          selected={this.state.selectedIndex === 0}
          onClick={event => this.handleListItemClick(event, 0)}>
            <ListItemIcon className={classes.itemIcon}>
              <AssistantIcon />
            </ListItemIcon>
            <ListItemText primary='Chat 1'/>
          </ListItem>
          <ListItem
          button
          selected={this.state.selectedIndex === 1}
          onClick={event => this.handleListItemClick(event, 1)}>
          <ListItemIcon className={classes.itemIcon}>
              <AssistantIcon />
            </ListItemIcon>
            <ListItemText primary='Chat 2'/>
          </ListItem>
          <ListItem
          button
          selected={this.state.selectedIndex === 2}
          onClick={event => this.handleListItemClick(event, 2)}>
          <ListItemIcon className={classes.itemIcon}>
              <AssistantIcon />
            </ListItemIcon>
            <ListItemText primary='Chat 3'/>
          </ListItem>
        </List>
        <Divider />
      </div>
    );
  };
}

export default withStyles(useStyles)(ChatList);