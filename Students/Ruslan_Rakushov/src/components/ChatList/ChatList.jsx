import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
// import { AppBar, Toolbar, IconButton, Typography, Badge } from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = (theme => ({
  root: {
    width: '30vh',
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
            <ListItemText primary='chat1'/>
          </ListItem>
          <ListItem>
            <ListItemText primary='chat2'/>
          </ListItem>
          <ListItem>
            <ListItemText primary='chat3'/>
          </ListItem>
        </List>
      </div>
    );
  };
}

export default withStyles(useStyles)(ChatList);