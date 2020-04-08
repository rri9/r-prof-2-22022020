import { RSAA, getJSON } from "redux-api-middleware";

export const START_PROFILE_LOADING = '@@profile/START_PROFILE_LOADING';
export const SUCCESS_PROFILE_LOADING = '@@profile/SUCCESS_PROFILE_LOADING';
export const ERROR_PROFILE_LOADING = '@@profile/ERROR_PROFILE_LOADING';

export const START_PROFILE_SAVING = '@@profile/START_PROFILE_SAVING';
export const SUCCESS_PROFILE_SAVING = '@@profile/SUCCESS_PROFILE_SAVING';
export const ERROR_PROFILE_SAVING = '@@profile/ERROR_PROFILE_SAVING';

// export const CHECK_AUTH = '@@profile/CHECK_AUTH';
export const USER_REG = '@@profile/USER_REG';
export const USER_LOGIN = '@@profile/USER_LOGIN';
export const USER_LOGIN_START = '@@profile/USER_LOGIN_START';
export const USER_LOGIN_FINISH = '@@profile/USER_LOGIN_FINISH';

export const loadProfile = () => ({
  [RSAA]: {
    endpoint: '/api/profile',
    method: 'GET',
    types: [
      START_PROFILE_LOADING,
      {
        type: SUCCESS_PROFILE_LOADING,
        payload: (action, state, res) => {
          return getJSON(res).then(json => json);
        },
      },
      {
        type: ERROR_PROFILE_LOADING,
        payload: (action, state, res) => {
          return getJSON(res).then(json => json);
        },
      },
    ],
  },
});

export const setUserInfo = (_id, userName, userEmail, userAge) => ({
  [RSAA]: {
    endpoint: '/api/profile',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({_id, userName, userEmail, userAge}),
    types: [
      START_PROFILE_SAVING,
      {
        type: SUCCESS_PROFILE_SAVING,
        payload: (action, state, res) => {
          return getJSON(res).then(json => json);
        },
      },
      ERROR_PROFILE_SAVING,
    ],
  },
});

export const userReg = (userName, userEmail, userAge, password) => ({
  type: USER_REG,
  userName,
  userEmail,
  userAge,
  password,
});
 
export const userLogin = (userName, password) => ({
  type: USER_LOGIN,
  userName,
  password,
});
 
export const userLoginStart = () => ({
  type: USER_LOGIN_START,
});
 
export const userLoginFinish = () => ({
  type: USER_LOGIN_FINISH,
});
 