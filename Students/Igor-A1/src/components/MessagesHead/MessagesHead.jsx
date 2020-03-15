import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";

import {
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  Fab,
  IconButton,
  Icon } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { indigo, purple, blue } from '@material-ui/core/colors';
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

const LightTooltip = withStyles(theme => ({
  arrow: {
    color: blue["400"],
  },
  tooltip: {
    backgroundColor: blue["400"],
    color: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
}))(Tooltip);

class MessagesHead extends Component {
  static propTypes = {
    chatId: PropTypes.number,
    chats: PropTypes.object.isRequired,
  };
  
  render() {
    let { classes } = this.props;
    
    return (
      <header className="msgs-head">
        <AppBar position="static">
          <Toolbar className={ classes.root } >
            <LightTooltip  className={ classes.tooltip } arrow title="профиль" aria-label="профиль" placement="right">
              <Fab className={ classes.hovered } color="primary" aria-label="профиль">
                <Icon>person</Icon>
              </Fab>
            </LightTooltip >
            
            <Typography className={ classes.title } >
              { `:: ${this.props.chats[this.props.chatId].user} ::` }
            </Typography>
            
            <LightTooltip  className={ classes.tooltip } arrow title="поиск" aria-label="поиск" placement="left">
            <Fab className={ classes.hovered } color="primary" aria-label="поиск">
              <Icon>search</Icon>
            </Fab>
            </LightTooltip >
          </Toolbar>
        </AppBar>
      </header>
    );
  };
};

const mapStateToProps = ({ chatsReducer }) => ({
  chats: chatsReducer.chats
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({}, dispatch);
  
export default
  connect(mapStateToProps,)
    (withStyles(useStyles)(MessagesHead));
