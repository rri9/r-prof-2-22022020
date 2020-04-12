//TODO Проверить редирект из Login.jsx в чаты без ввода почты/пароля при наличии токена в сторе

import React from 'react';
import PropTypes from 'prop-types';

//redux
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { login } from "../../store/actions/userActions.js";
import { push } from "connected-react-router";

// UI
import { TextField, Typography, Button } from '@material-ui/core';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailErr: false,
      passwordErr: false,
    };
  }

  handleChange = (evt) => {
    if (evt.keyCode === 13) {
      this.handleLogin(this.state.email, this.state.password);
    } else {
      this.setState({ [evt.target.name]: evt.target.value });
      if (!!evt.target.value) {
        this.setState({
          [`${evt.target.name}Err`]: !evt.target.value
        });
      }
      
    }
  };

  handleLogin = (email, password) => {
    if (!email || !password) {
      this.setState({
        emailErr: !email,
        passwordErr: !password,
      });
      return;
    }
    this.props.login(email, password);
  }
  
  handleReg = () => {
    this.setState({
      userName: '',
      password: '',
      userNameErr: false,
      passwordErr: false,
    });
    this.props.push('/registration/');
  }

  componentDidMount() {
    if (this.props.user.token) {
      this.props.push('/chats');
    }
  }

  render() {
    return (
      <div className='login-container'>
      <Typography
        variant='h3'
        align='center'
      >Авторизация</Typography>

      {this.props.userLoginError && <p className="error-message">{this.props.userLoginError}</p>}

      <form className='login-form'>
        <TextField
          className='form-item'
          autoFocus
          margin="dense"
          id="email"
          name="email"
          label="Email пользователя"
          type="text"
          required
          autoComplete="on"
          error={this.state.emailErr}
          value={this.state.email}
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
          autoComplete="off"
          error={this.state.passwordErr}
          type="password"
          value={this.state.password}
          onChange = {this.handleChange}
          onKeyUp = {this.handleChange}
        />
        <div className='content-to-center'>
          <Button onClick={() => this.handleLogin(this.state.email, this.state.password)}
            color="primary"
            variant='outlined'
          >Войти</Button>
          <Button onClick={this.handleReg}
            color="primary"
            variant='outlined'
          >Регистрация</Button>
        </div>
        </form>
      </div>
    );
  }
};

Login.propTypes = {
  user: PropTypes.object,
  userLoginError: PropTypes.string,
}
  
const mapStateToProps = ({ userReducers }) => ({
  user: userReducers.user,
  userLoginError: userReducers.userLoginError,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  login,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
