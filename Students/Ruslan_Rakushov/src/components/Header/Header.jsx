import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Badge } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = (theme => ({
  root: {},
  appbar: {
    backgroundColor: 'skyblue',
    maxWidth: '600px',
    right: 'auto',
  },
  menuButton: {},
  title: {},
  rightMenu: {
    marginLeft: 'auto',
  },
}));

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appbar}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" className={classes.title}>
              ReactGram &copy;
            </Typography>
            <div className={classes.rightMenu}>
              <IconButton aria-label="notifications" color="inherit">
                <Badge badgeContent={2} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton aria-label="account" color="inherit">
                <AccountCircle/>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  };
}

export default withStyles(useStyles)(Header);