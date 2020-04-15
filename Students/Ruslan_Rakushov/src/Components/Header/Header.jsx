import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from "connected-react-router";

// UI
import {
  AppBar, Toolbar, IconButton, Typography, Badge, TextField, 
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';

//redux
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { setSearchText } from '../../store/actions/messageActions.js';

const styles = {
  appbar: {
    backgroundColor: 'skyblue',
    maxWidth: '700px',
    right: 'auto',
  },
  rightMenu: {
    marginLeft: 'auto',
  },
  searchContainer: {
    position: 'absolute',
    right: '0px',
    bottom: '-25px',
    backgroundColor: 'lightgrey',
    opacity: '.9',
    width: '265px',
  },
  searchField: {
    width: '100%'
  },
  searchBtn: {
    padding: '0',
    margin: '7px 7px 0 0',
    position: 'absolute',
    right: '0',
  }
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchVisible: false,
      searchText: '',
    };
  }

  handleSeachBtnClick = () => {
    this.setState({
      isSearchVisible: !this.state.isSearchVisible,
    });
  };

  handleSearch = (str) => {
    this.props.setSearchText(str);
  };

  handleChange = (evt) => {
    if (evt.keyCode === 13) {
      this.handleSearch(this.state.searchText);
    } else if (evt.keyCode === 27) {
      this.handleSearch('');
      this.setState({
        isSearchVisible: !this.state.isSearchVisible,
        searchText: '',
      });
    } else {
      this.setState({
        searchText: evt.target.value
      });
    }
  };

  render() {
    const { chats, currentChatId, user } = this.props;
    let currentChatIndex = null;
    let currentChatTitle = '';
    if (currentChatId) {
      currentChatIndex = chats.findIndex(chat => chat._id === currentChatId);
      currentChatTitle = chats[currentChatIndex].title;
    }
    return (
      <AppBar style={styles.appbar}>
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h5">
            ReactGram &copy; {currentChatId && <>{currentChatTitle}</>}
          </Typography>
          <div style={styles.rightMenu}>
            <IconButton aria-label="search" color="inherit"
              onClick={this.handleSeachBtnClick}
            >
              <Badge color='secondary' variant='dot' invisible={!this.props.searchText}>
                <SearchIcon/>
              </Badge>
            </IconButton>
            <IconButton aria-label="account" color="inherit"
              onClick={this.handleAccBtnClick}>
              <AccountCircle/>
            </IconButton>
            {!!user && <>{user.name}</>}
          </div>
        </Toolbar>
        {this.state.isSearchVisible &&
          <div style={styles.searchContainer}>
            <TextField
            name='searchText'
            value={this.state.searchText}
            style={styles.searchField}
            size='small'
            variant='outlined'
            autoFocus
            label='Enter - поиск, Esc - отмена'
            onChange = {this.handleChange}
            onKeyUp = {this.handleChange}
            />
            <IconButton 
            style={styles.searchBtn}
            onClick={() => this.handleSearch(this.state.searchText)}
            >
              <SendOutlinedIcon />
            </IconButton>
          </div>
        }
      </AppBar>
    );
  };
}

Header.propTypes = {
  user: PropTypes.object,
  chats: PropTypes.arrayOf(PropTypes.object),
  currentChatId: PropTypes.string,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
}

Header.defaultProps = {
}

const mapStateToProps = ({ chatReducers, userReducers }) => ({
  user: userReducers.user,
  chats: chatReducers.chats,
  currentChatId: chatReducers.currentChatId,
  searchText: chatReducers.searchText,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setSearchText,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
