import {push} from 'connected-react-router';

export const USER_LOGIN_START = '@@user/USER_LOGIN_START';
export const USER_LOGIN_SUCCESS = '@@user/USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = '@@user/USER_LOGIN_ERROR';

export const USER_LOGOUT_START = '@@user/USER_LOGOUT_START';
export const USER_LOGOUT_SUCCESS = '@@user/USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_ERROR = '@@user/USER_LOGOUT_ERROR';

export const USER_REGISTRATION_START = '@@user/USER_REGISTRATION_START';
export const USER_REGISTRATION_SUCCESS = '@@user/USER_REGISTRATION_SUCCESS';
export const USER_REGISTRATION_ERROR = '@@user/USER_REGISTRATION_ERROR';

export const USER_SAVE_START = '@@user/USER_SAVE_START';
export const USER_SAVE_SUCCESS = '@@user/USER_SAVE_SUCCESS';
export const USER_SAVE_ERROR = '@@user/USER_SAVE_ERROR';

//----------login
export const login = (email, password) => {
  return async (dispatch) => {
    dispatch(loginStart());

    let response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    });
    let result = await response.json();

    if (response.status === 200) {
      dispatch(loginSuccess(result.user));
      dispatch(push('/chats'));
    } else {
      dispatch(loginError(result.error));
    }
  };
};
export const loginStart = () => ({
  type: USER_LOGIN_START,
});
export const loginSuccess = (user) => ({
  type: USER_LOGIN_SUCCESS,
  payload: user
});
export const loginError = (error) => ({
  type: USER_LOGIN_ERROR,
  payload: error
});

//----------logout
export const logout = (email, token) => {
  return async (dispatch) => {
    dispatch(logoutStart());

    let response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ email: email })
    });
    let result = await response.json();

    if (response.status === 200) {
      dispatch(logoutSuccess(result.message));
      dispatch(push('/login'));
    } else {
      dispatch(logoutError(result.error));
    }
  };
};
export const logoutStart = () => ({
  type: USER_LOGOUT_START,
});
export const logoutSuccess = (message) => ({
  type: USER_LOGOUT_SUCCESS,
  payload: message
});
export const logoutError = (error) => ({
  type: USER_LOGOUT_ERROR,
  payload: error
});

//---registration
export const registration = (name, email, age, password) => {
  return async (dispatch) => {
    dispatch(registrationStart());

    let response = await fetch('/api/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, email: email, age: age, password: password })
    });
    let result = await response.json();

    if (response.status === 201) {
      dispatch(registrationSuccess());
      dispatch(push('/login'));
    } else {
      dispatch(registrationError(result.error));
    }
  }
}
export const registrationStart = () => ({
  type: USER_REGISTRATION_START,
});
export const registrationSuccess = () => ({
  type: USER_REGISTRATION_SUCCESS,
});
export const registrationError = (error) => ({
  type: USER_REGISTRATION_ERROR,
  payload: error
});
//---------------setUserInfo
export const setUserInfo = (id, name, age, email, token) => {
  return async (dispatch) => {
    dispatch(setUserInfoStart());

    let response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ id: id, name: name, age: age, email: email })
    });
    let result = await response.json();

    if (response.status === 200) {
      dispatch(setUserInfoSuccess(name, age, result.message));
    } else {
      dispatch(setUserInfoError(result.error));
    }
  }
}
export const setUserInfoStart = () => ({
  type: USER_SAVE_START,
});
export const setUserInfoSuccess = (name, age, message) => ({
  type: USER_SAVE_SUCCESS,
  payload: {name: name, age: age, message: message}
});
export const setUserInfoError = (error) => ({
  type: USER_SAVE_ERROR,
  payload: error
});