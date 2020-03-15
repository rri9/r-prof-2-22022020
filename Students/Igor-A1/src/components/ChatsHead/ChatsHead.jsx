import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Fab, IconButton, Icon } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
   root: {
      backgroundColor: theme.palette.primary.main,
      padding: theme.spacing(2),
      justifyContent: 'space-around',
   },
   hovered: {
      '&:hover, &:active': {
         color: theme.palette.secondary.main
      },
   },
}));

export default function ChatsHead() {
  const classes = useStyles();

  return (
    <div className="chats-head">
      <AppBar position="static">
        <Toolbar className={classes.root}>
          <Fab className={classes.hovered} color="primary" aria-label="menu">
            <Icon>menu</Icon>
          </Fab>
          <Typography className={classes.title}>
            GeekMessenger&trade;
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
