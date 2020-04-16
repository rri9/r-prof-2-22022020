import update from 'immutability-helper';
import {
  USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR,
  USER_REGISTRATION_START, USER_REGISTRATION_SUCCESS, USER_REGISTRATION_ERROR,
  USER_LOGOUT_START, USER_LOGOUT_SUCCESS, USER_LOGOUT_ERROR,
  USER_SAVE_START, USER_SAVE_SUCCESS, USER_SAVE_ERROR,
} from '../actions/userActions.js';

const initialStore = {
  user: {},
  isLoading: false,
  userLoginError: '',
  userRegistrationError: '',
  userRegistrationMessage: '',
  userSaveError: '',
  userSaveMessage: '',
};

export default function userReducers(store = initialStore, action) {
  switch (action.type) {
    case USER_LOGIN_START:
      return update(store, {
        isLoading: { $set: true },
        userLoginError: { $set: '' },
      });
    case USER_LOGIN_SUCCESS:
      return update(store, {
        isLoading: { $set: false },
        userLoginError: { $set: '' },
        user: { $set: action.payload },
        userRegistrationMessage: { $set: '' },
      });
    case USER_LOGIN_ERROR:
      return update(store, {
        isLoading: { $set: false },
        userLoginError: { $set: action.payload },
        userRegistrationMessage: { $set: '' },
      });
//--------------------------------------------------------------
    case USER_REGISTRATION_START:
      return update(store, {
        isLoading: { $set: true },
        userRegistrationError: { $set: '' },
      });
    case USER_REGISTRATION_SUCCESS:
      return update(store, {
        isLoading: { $set: false },
        userRegistrationError: { $set: '' },
        userRegistrationMessage: { $set: 'Вы успешно зарегистрировались. Введите адрес электронной почты и пароль, указанные при регистрации' },
      });
    case USER_REGISTRATION_ERROR:
      return update(store, {
        isLoading: { $set: false },
        userRegistrationError: { $set: action.payload },
      });
//--------------------------------------------------------------
    case USER_LOGOUT_START:
      return update(store, {
        isLoading: { $set: true },
        userLoginError: { $set: '' },
      });
    case USER_LOGOUT_SUCCESS:
      return update(store, {
        user: { $set: {} },
        isLoading: { $set: false },
        userLoginError: { $set: '' },
      });
    case USER_LOGOUT_ERROR:
      return update(store, {
        user: { $set: {}},
        isLoading: { $set: false },
        userLoginError: { $set: action.payload },
      });
//--------------------------------------------------------------
case USER_SAVE_START:
  return update(store, {
    isLoading: { $set: true },
    userSaveError: { $set: '' },
    userSaveMessage: { $set: '' },
  });
case USER_SAVE_SUCCESS:
  return update(store, {
    user: {
      name: { $set: action.payload.name },
      age: { $set: action.payload.age }
    },
    isLoading: { $set: false },
    userSaveError: { $set: '' },
    userSaveMessage: { $set: action.payload.message },
  });
case USER_SAVE_ERROR:
  return update(store, {
    isLoading: { $set: false },
    userSaveError: { $set: action.payload },
    userSaveMessage: { $set: '' },
  });
//--------------------------------------------------------------
    default:
      return store;
  }
}
