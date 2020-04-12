import React from 'react';
import PropTypes from 'prop-types';

//redux
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { push } from "connected-react-router";
import { registration } from '../../store/actions/userActions.js';

// UI
import { TextField, Typography, Button } from '@material-ui/core';
import './Registration.css';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // _id: '',
      name: '',
      email: '',
      age: 0,
      password: '',
      nameErr: false,
      emailErr: false,
      ageErr: false,
      passwordErr: false,
    };
  }

  handleChange = (evt) => {
    if (evt.keyCode === 13) {
      this.handleRegistration(this.state.name, this.state.email, this.state.age, this.state.password);
    } else {
      this.setState({ [evt.target.name]: evt.target.value });
      if (!!evt.target.value) {
        this.setState({
          [`${evt.target.name}Err`]: !evt.target.value
        });
      }
    }
  };

  handleRegistration = (name, email, age, password) => {
    if (!name || !email || !age || !password) {
      this.setState({
        nameErr: !name,
        emailErr: !email,
        ageErr: !age,
        passwordErr: !password,
      });
      return;
    }
    this.props.registration(name, email, age, password);
  }

  handleLogin = () => {
      this.setState({
        name: '',
        email: '',
        age: 0,
        password: '',
        nameErr: false,
        emailErr: false,
        ageErr: false,
        passwordErr: false,
      });
    this.props.push('/login');
  }
  
  render() {
    return (
      <div className='register-container'>
      <Typography
        variant='h3'
        align='center'
      >Регистрация</Typography>
        
      {this.props.userRegistrationError && <p className='error-message'> {this.props.userRegistrationError} </p>}
      
      <form className='register-form'>
        <TextField
          className='form-item'
          autoFocus
          margin="dense"
          id="name"
          name="name"
          label="Имя пользователя"
          type="text"
          required
          autoComplete="on"
          error={this.state.nameErr}
          value={this.state.name}
          onChange = {this.handleChange}
          onKeyUp = {this.handleChange}
        />
        <TextField
          className='form-item'
          margin="dense"
          id="email"
          name="email"
          label="Адрес электронной почты"
          type="email"
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
          id="age"
          name="age"
          label="Ваш возраст"
          required
          autoComplete="on"
          error={this.state.ageErr}
          type="number"
          value={this.state.age}
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
          <Button onClick={() => this.handleRegistration(this.state.name, this.state.email, this.state.age, this.state.password)}
            color="primary"
            variant='outlined'
          >Зарегистрироваться</Button>
          <Button onClick={this.handleLogin}
            color="primary"
            variant='outlined'
          >Войти</Button>
        </div>
      </form>
    </div>
    );
  }
};

Registration.propTypes = {
  userRegistrationError: PropTypes.string,
}

const mapStateToProps = ({ userReducers }) => ({
  userRegistrationError: userReducers.userRegistrationError,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  registration,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
