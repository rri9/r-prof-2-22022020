import update from 'immutability-helper';
import {
  USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR,
} from '../actions/userActions.js';

const initialStore = {
  user: {},
  isLoading: false,
  userLoadingError: '',
};

export default function userReducers(store = initialStore, action) {
  switch (action.type) {
    case USER_LOGIN_START:
      return update(store, {
        isLoading: { $set: true }
      });
    //-------------------
    case USER_LOGIN_SUCCESS:
      return update(store, {
        isLoading: { $set: false },
        userLoadingError: { $set: '' },
        user: { $set: action.payload},
      });
    //-------------------
    case USER_LOGIN_ERROR:
      return update(store, {
        isLoading: { $set: false },
        userLoadingError: { $set: action.payload },
      });
    //-------------------
    default:
      return store;
  }
}
