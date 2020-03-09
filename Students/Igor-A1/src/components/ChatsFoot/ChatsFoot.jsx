import React, {Component} from 'react'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
   root: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
      padding: theme.spacing(2),
      justifyContent: 'space-around',
   },
   hovered: {
      '&:hover, &:active': {
         color: theme.palette.secondary.main
      },
   },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
}));

export default function ChatsFoot() {
  const classes = useStyles();

  return (
    <div className="chats-foot">
      <AppBar position="static">
        <Toolbar className={classes.root}>
          <Fab className={classes.hovered} color="primary" aria-label="forum">
            <Icon>forum</Icon>
          </Fab>
          <Fab className={classes.hovered} color="primary" aria-label="account circle">
            <Icon>account_circle</Icon>
          </Fab>
          <Fab className={classes.hovered} color="primary" aria-label="settings">
            <Icon>settings</Icon>
          </Fab>
        </Toolbar>
      </AppBar>
    </div>
  );
}
