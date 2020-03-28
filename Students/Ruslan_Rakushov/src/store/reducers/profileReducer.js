import update from 'immutability-helper';
import {
  // SET_USER_DATA,
  START_PROFILE_LOADING, SUCCESS_PROFILE_LOADING, ERROR_PROFILE_LOADING,
  START_PROFILE_SAVING, SUCCESS_PROFILE_SAVING, ERROR_PROFILE_SAVING, 
} from '../actions/profileActions';

const initialStore = {
  profile: {}
};

export default function profileReducer(store = initialStore, action) {
  switch (action.type) {
    case START_PROFILE_SAVING:
      return store;
    case SUCCESS_PROFILE_SAVING:
      return update(store, {
        profile: { $set: action.payload.profile }
      });
    case ERROR_PROFILE_SAVING:
      return store;
    
    case START_PROFILE_LOADING:
      return store;
    case SUCCESS_PROFILE_LOADING:
      if (!action.payload.length) {
        return update(store, {
          profile: {
            _id: {$set: ''},
            userName: {$set: ''},
            userEmail: {$set: ''},
            userAge: {$set: 0},
          }
        });
      }
      return update(store, {
        profile: { $set: action.payload[0] }
      });
    case ERROR_PROFILE_LOADING:
      return store;
  
    default:
      return store;
  }
}