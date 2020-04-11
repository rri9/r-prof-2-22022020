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

//redux
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

const styles = {
  appbar: {
    backgroundColor: 'skyblue',
    maxWidth: '700px',
    right: 'auto',
  },
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
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchVisible: false,
    };
  }

  handleSeachBtnClick = () => {
    this.setState({
      isSearchVisible: !this.state.isSearchVisible,
    });
  };

  handleSearch = (str) => {
    // this.props.setSearchText(str);
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

  render() {
    return (
      <AppBar style={styles.appbar}>
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h5">
            ReactGram &copy;
            {/* ReactGram &copy; {currentChatTitle} */}
          </Typography>
          <div style={styles.rightMenu}>
            <IconButton aria-label="search" color="inherit"
              onClick={this.handleSeachBtnClick}
            >
              <SearchIcon/>
            </IconButton>
            <IconButton aria-label="account" color="inherit"
              onClick={this.handleAccBtnClick}>
              <AccountCircle/>
            </IconButton>
            {/* {profile.userName} */}
          </div>
        </Toolbar>
        {this.state.isSearchVisible &&
          <TextField
          name='searchText'
          style={styles.searchField}
          size='small'
          variant='outlined'
          autoFocus
          label='Enter - поиск, Esc - отмена'
          onChange = {this.handleChange}
          onKeyUp = {this.handleChange}
          />
        }
      </AppBar>
    );
  };
}

Header.propTypes = {
}

Header.defaultProps = {
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
