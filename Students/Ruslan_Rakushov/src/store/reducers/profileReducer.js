import update from 'immutability-helper';
import {
  // SET_USER_DATA,
  START_PROFILE_LOADING, SUCCESS_PROFILE_LOADING, ERROR_PROFILE_LOADING,
  START_PROFILE_SAVING, SUCCESS_PROFILE_SAVING, ERROR_PROFILE_SAVING, 
  CHECK_AUTH, USER_REG,
  USER_LOGIN, USER_LOGIN_START, USER_LOGIN_FINISH, 
} from '../actions/profileActions';

const initialStore = {
  profile: {
    tokens: [],
  },
  profileLoadingError: '',
  isLoading: false,
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
      console.log('START_PROFILE_LOADING')
      return store;
    case SUCCESS_PROFILE_LOADING:
      console.log('in SUCCESS_PROFILE_LOADING action.payload:', action.payload)
      if (!action.payload._id) {
        console.log('save empty profile')
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
        profile: { $set: action.payload }
      });
    case ERROR_PROFILE_LOADING:
      return update(store, {
        profileLoadingError: { $set: action.payload.error },
      });
    
    case USER_REG:
      return update(store, {
        profile: {
          _id: {$set: action.userId},
          userName: {$set: action.userName},
          userEmail: {$set: action.userEmail},
          userAge: { $set: action.userAge },
          tokens: {$push: [action.token]},
        },
        profileLoadingError: { $set: action.error },
      });
    
    case USER_LOGIN:
      console.log('USER_LOGIN')
      console.log('in profileReducer:', action)
      return update(store, {
        profile: {
          _id: {$set: action.userId},
          userName: { $set: action.userName },
          userEmail: {$set: action.userEmail},
          userAge: { $set: action.userAge },
          tokens: {$push: [action.token]},
        },
        profileLoadingError: { $set: '' },
        isLoading: { $set: false},
      });
    
    case USER_LOGIN_START:
      console.log('USER_LOGIN_START')
      return update(store, {
        isLoading: { $set: true},
      });
    case USER_LOGIN_FINISH:
      console.log('USER_LOGIN_FINISH')
      return update(store, {
        isLoading: { $set: false},
      });
  
    default:
      return store;
  }
}