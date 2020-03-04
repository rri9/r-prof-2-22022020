import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import AssistantIcon from '@material-ui/icons/Assistant';

const useStyles = (theme => ({
  root: {
    width: '30vh',
    marginTop: '50px',
  },
  itemIcon: {
    minWidth: '35px',
  },
}));

class ChatList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List>
          <ListItem>
            <ListItemIcon className={classes.itemIcon}>
              <AssistantIcon />
            </ListItemIcon>
            <ListItemText primary='Chat 1'/>
          </ListItem>
          <ListItem>
          <ListItemIcon className={classes.itemIcon}>
              <AssistantIcon />
            </ListItemIcon>
            <ListItemText primary='Chat 2'/>
          </ListItem>
          <ListItem>
          <ListItemIcon className={classes.itemIcon}>
              <AssistantIcon />
            </ListItemIcon>
            <ListItemText primary='Chat 3'/>
          </ListItem>
        </List>
      </div>
    );
  };
}

export default withStyles(useStyles)(ChatList);