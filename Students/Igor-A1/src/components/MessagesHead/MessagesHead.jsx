import React, {Component} from 'react'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
}));

export default function MessagesHead() {
  const classes = useStyles();

  return (
    <header className="msgs-head">
      <AppBar position="static">
        <Toolbar>
          <Typography style={{ marginLeft: 16 }} className={classes.title}>
            Messages header
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  );
}
