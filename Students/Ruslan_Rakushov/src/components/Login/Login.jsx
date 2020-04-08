import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  TextField, Typography, Button, 
} from '@material-ui/core';

import './Login.css';

//redux
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { userLogin } from "../../store/actions/profileActions.js";

import { push } from "connected-react-router";

const useStyles = ((theme) => ({
  root: {},
}));

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      userNameErr: false,
      passwordErr: false,
    };
  }

  handleChange = (evt) => {
    if (evt.keyCode === 13) {
      // FIX тут должен быть логин
      this.handleLogin(this.state.userName, this.state.password);
    } else {
      this.setState({ [evt.target.name]: evt.target.value });
      if (!!evt.target.value) {
        this.setState({
          [`${evt.target.name}Err`]: !evt.target.value
        });
      }
      
    }
  };

  handleLogin = (userName, password) => {
    if (!userName || !password) {
      this.setState({
        userNameErr: !userName,
        passwordErr: !password,
      });
      return;
    }

    console.log('this.props.isLoading', this.props.isLoading);
    this.props.userLogin(userName, password);
    console.log('this.props.isLoading', this.props.isLoading);
    console.log('next line in Login.jsx');

    // this.props.push('/')
  }
  
  handleReg = () => {
    this.setState({
      userName: '',
      password: '',
      userNameErr: false,
      passwordErr: false,
    });
    this.props.push('/register/');
  }

  componentDidMount() {
    // this.props.checkAuth();
  };

  componentDidUpdate() {
    if (this.props.profile._id) {
      this.props.push('/')
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <div className='login-container'>
      <Typography
        variant='h3'
        align='center'
      >
        Авторизация
      </Typography>
      <form className='login-form'>
        <TextField
          className='form-item'
          autoFocus
          margin="dense"
          id="userName"
          name="userName"
          label="Имя пользователя"
          type="text"
          required
          error={this.state.userNameErr}
          value={this.state.userName}
          onChange = {this.handleChange}
          onKeyUp = {this.handleChange}
          />
          <TextField
            className='form-item'
            margin="dense"
            id="password"
            name="password"
            label="Пароль"
            required
            error={this.state.passwordErr}
            type="password"
            value={this.state.password}
            onChange = {this.handleChange}
            onKeyUp = {this.handleChange}
          />
          <Button onClick={() => this.handleLogin(this.state.userName, this.state.password)}
            color="primary"
            variant='outlined'
          >
            Войти
          </Button>
          <Button onClick={this.handleReg}
            color="primary"
            variant='outlined'
          >
            Регистрация
          </Button>
        </form>
        </div>
    );
  }
};

const mapStateToProps = ({ profileReducer }) => ({
  profile: profileReducer.profile,
  isLoading: profileReducer.isLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  // checkAuth,
  push,
  userLogin,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Login));
