import {push} from 'connected-react-router';

export const USER_LOGIN_START = '@@profile/USER_LOGIN_START';
export const USER_LOGIN_SUCCESS = '@@profile/USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = '@@profile/USER_LOGIN_ERROR';

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch(loginStart());

    let response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': '', // TODO При наличии токена - сразу авторизовать
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
 