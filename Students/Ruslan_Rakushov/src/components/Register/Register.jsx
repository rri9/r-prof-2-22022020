import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  TextField, Typography, Button, 
} from '@material-ui/core';

import './Register.css';

//redux
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { userReg } from "../../store/actions/profileActions.js";

import { push } from "connected-react-router";

const useStyles = ((theme) => ({
  root: {},
}));

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      userName: '',
      userEmail: '',
      userAge: 0,
      password: '',
      userNameError: false,
      userEmailError: false,
      userAgeError: false,
      passwordError: false,
    };
  }

  handleChange = (evt) => {
    if (evt.keyCode === 13) {
      this.handleUserReg(this.state.userName, this.state.userEmail, this.state.userAge, this.state.password);
    } else {
      this.setState({ [evt.target.name]: evt.target.value });
      if (!!evt.target.value) {
        this.setState({
          [`${evt.target.name}Err`]: !evt.target.value
        });
      }
      
    }
  };

  handleUserReg = (userName, userEmail, userAge, password) => {
    if (!userName || !userEmail || !userAge || !password) {
      this.setState({
        userNameErr: !userName,
        userEmailErr: !userEmail,
        userAgeErr: !userAge,
        passwordErr: !password,
      });
      return;
    }
    this.props.userReg(userName, userEmail, userAge, password);
    if (this.props.profileLoadingError == '') {
      this.props.push('/login');
    }
  }

  handleLogin = () => {
      this.setState({
        userName: '',
        userEmail: '',
        userAge: '',
        password: '',
        userNameErr: false,
        userEmailErr: false,
        userAgeErr: false,
        passwordErr: false,
      });
    this.props.push('/login');
  }
  
  componentDidMount() {
    // this.props.checkAuth();
  };

  render() {
    const {classes} = this.props;
    return (
      <div className='register-container'>
      <Typography
        variant='h3'
        align='center'
      >
          Регистрация
      </Typography>
        {this.props.profileLoadingError && <p> {this.props.profileLoadingError} </p>}
      <form className='register-form'>
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
          id="userEmail"
          name="userEmail"
          label="Адрес электронной почты"
          type="email"
          required
          error={this.state.userEmailErr}
          value={this.state.userEmail}
          onChange = {this.handleChange}
          onKeyUp = {this.handleChange}
        />
          <TextField
            className='form-item'
            margin="dense"
            id="userAge"
            name="userAge"
            label="Ваш возраст"
            required
            error={this.state.userAgeErr}
            type="number"
            value={this.state.userAge}
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
          <Button onClick={() => this.handleUserReg(this.state.userName, this.state.userEmail, this.state.userAge, this.state.password)}
            color="primary"
            variant='outlined'
          >
            Сохранить
          </Button>
          <Button onClick={this.handleLogin}
            color="primary"
            variant='outlined'
          >
            Войти
          </Button>
        </form>
        </div>
    );
  }
};

const mapStateToProps = ({ profileReducer }) => ({
  profile: profileReducer.profile,
  profileLoadingError: profileReducer.profileLoadingError,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  // checkAuth,
  push,
  userReg,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Register));
