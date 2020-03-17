export const SET_USER_DATA = '@@profile/SET_USER_DATA';

export const setUserInfo = (userName, userEmail, userAge) => ({
  type: SET_USER_DATA,
  userName,
  userEmail,
  userAge,
});