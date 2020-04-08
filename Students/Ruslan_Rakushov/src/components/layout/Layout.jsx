import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Header from '../Header/Header.jsx';
import ChatList from '../ChatList/ChatList.jsx';
import MessageField from '../MessageField/MessageField.jsx';
import InstallPopup from "../InstallPopup/InstallPopup.jsx";
import './Layout.css';
//redux
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { loadChats } from "../../store/actions/chatActions.js";
import { loadProfile, checkAuth } from "../../store/actions/profileActions.js";

import { push } from "connected-react-router";

const useStyles = (theme => ({
  // root: {},
}));

class Layout extends Component {

  componentDidMount() {
    // this.props.checkAuth();
    console.log('Layout didMount')
    // Если в куках есть токен, то поиск юзера по токену и загрузка
    // Если нет токена в куках, то на страницу логина
    this.props.loadProfile();
    console.log('this.props.profile=', this.props.profile);
    // TODO !!! Текущее: после авторизации test1 - 6 нет профиля в пропах
    if (!this.props.profile._id) {
      console.log('no profile._id, push to /login/')
      this.props.push('/login/');
    }
    console.log('after loadProfile() profileLoadingError:', this.props.profileLoadingError)
    if (!this.props.profileLoadingError) {
      this.props.loadChats();
    }
  };

  render() {
    const { classes } = this.props;
    return (
        <div className='layout'>
          {!this.props.profileLoadingError && <Header />}
          {!this.props.profileLoadingError && <ChatList />}
          {!this.props.profileLoadingError && <MessageField />}
          {!this.props.profileLoadingError && <InstallPopup />}
        </div>
    );
  };
}

const mapStateToProps = ({ profileReducer }) => ({
  profile: profileReducer.profile,
  profileLoadingError: profileReducer.profileLoadingError,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadChats,
  loadProfile,
  push,
  // checkAuth,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Layout));
