import React, { Component } from 'react';
import PropTypes from "prop-types";

import { AppBar, Toolbar, Typography, Fab, IconButton, Icon } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
const useStyles = (theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    justifyContent: 'space-between',
  },
  hovered: {
    '&:hover, &:active': {
      color: theme.palette.secondary.main
    },
  },
}));

class MessagesHead extends Component {
  static propTypes = {
    chatId: PropTypes.number,
  };
  
  static defaultProps = {
    chatId: 1,
  };
  
  render() {
    let { classes } = this.props;
    
    return (
      <header className="msgs-head">
        <AppBar position="static">
          <Toolbar className={ classes.root } >
            <Icon>chat</Icon>
            <Typography className={ classes.title } >
              Чат { this.props.chatId }
            </Typography>
            <Fab className={ classes.hovered } color="primary" aria-label="search">
              <Icon>search</Icon>
            </Fab>
          </Toolbar>
        </AppBar>
      </header>
    );
  };
};

export default withStyles(useStyles)(MessagesHead);
