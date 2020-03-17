import update from 'immutability-helper';
import { SET_USER_DATA } from '../actions/profileActions';

const initialStore = {
  profile: {
    userName: '',
    userEmail: '',
    userAge: 0,
  }
};

export default function profileReducer(store = initialStore, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return update(store, {
        profile: { $merge: {
          userName: action.userName,
          userEmail: action.userEmail,
          userAge: +action.userAge,
        }}
      });
  
    default:
      return store;
  }
}