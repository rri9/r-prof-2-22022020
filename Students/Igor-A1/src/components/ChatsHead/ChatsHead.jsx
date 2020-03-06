import React, {Component} from 'react'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginLeft: theme.spacing(2),
  },
}));

export default function ChatsHead() {
  const classes = useStyles();

  return (
    <div className="chats-head">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Icon>menu</Icon>
          </IconButton>
          <Typography className={classes.title}>
            GeekMessenger&trade;
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
