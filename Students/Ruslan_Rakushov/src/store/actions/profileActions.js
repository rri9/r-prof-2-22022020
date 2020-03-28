import { RSAA, getJSON } from "redux-api-middleware";

export const START_PROFILE_LOADING = '@@profile/START_PROFILE_LOADING';
export const SUCCESS_PROFILE_LOADING = '@@profile/SUCCESS_PROFILE_LOADING';
export const ERROR_PROFILE_LOADING = '@@profile/ERROR_PROFILE_LOADING';

export const START_PROFILE_SAVING = '@@profile/START_PROFILE_SAVING';
export const SUCCESS_PROFILE_SAVING = '@@profile/SUCCESS_PROFILE_SAVING';
export const ERROR_PROFILE_SAVING = '@@profile/ERROR_PROFILE_SAVING';

export const SET_USER_DATA = '@@profile/SET_USER_DATA';


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
      ERROR_PROFILE_LOADING,
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
