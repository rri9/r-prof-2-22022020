// TODO Fix автофокус после поиска убегает на поле сообщения
// FIX При поиске 'l' находит сообщения без нее...

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { push } from "connected-react-router";
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, IconButton, Typography, Badge, TextField, 
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';

//redux
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { setSearchText } from "../../store/actions/messageActions.js";

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
  searchField: {
    position: 'absolute',
    right: '0px',
    bottom: '-25px',
    backgroundColor: 'lightgrey',
    opacity: '.9',
    width: '245px',
  },
}));

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchVisible: false,
    }
  }
  static propTypes = {
    chats: PropTypes.object.isRequired,
    currentChatId: PropTypes.number.isRequired,
    profile: PropTypes.object.isRequired,
  };

  handleAccBtnClick = () => {
    this.props.push('/profile/');
  };
  handleSeachBtnClick = () => {
    console.log('click search', this.state.isSearchVisible);
    
    this.setState({
      isSearchVisible: !this.state.isSearchVisible,
    });
  };

  handleChange = (evt) => {
    if (evt.keyCode === 13) {
      this.handleSearch(evt.target.value);
    } else if (evt.keyCode === 27) {
      this.handleSearch('');
      this.setState({
        isSearchVisible: !this.state.isSearchVisible,
      });
    }
  };

  handleSearch = (str) => {
    console.log(str);
    this.props.setSearchText(str);
  };

  render() {
    const { classes} = this.props;
    const {chats, currentChatId, profile } = this.props;
    return (
        <AppBar className={classes.appbar}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" className={classes.title}>
              ReactGram &copy; {chats[currentChatId].title}
            </Typography>
            <div className={classes.rightMenu}>
              {profile.userName}
              <IconButton aria-label="search" color="inherit"
                onClick={this.handleSeachBtnClick}
                >
                <SearchIcon/>
              </IconButton>
              <IconButton aria-label="notifications" color="inherit">
                <Badge badgeContent={2} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton aria-label="account" color="inherit"
                onClick={this.handleAccBtnClick}>
                <AccountCircle/>
              </IconButton>
            </div>
          </Toolbar>
        {this.state.isSearchVisible &&
          <TextField
          name='searchText'
          // value={this.state.searchText}
          className={classes.searchField}
          size='small'
          variant='outlined'
          autoFocus
          label='Введите фразу и нажмите Enter'
          onChange = {this.handleChange}
          onKeyUp = {this.handleChange}
          />}
        </AppBar>
    );
  };
}

const mapStateToProps = ({ chatReducer, profileReducer }) => ({
  chats: chatReducer.chats,
  currentChatId: chatReducer.currentChatId,
  profile: profileReducer.profile,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  setSearchText,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Header));
