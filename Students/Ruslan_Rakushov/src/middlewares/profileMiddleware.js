import {
  USER_REG,
  USER_LOGIN, userLoginStart, userLoginFinish, 
} from '../store/actions/profileActions';

export default store => next => async (action) => {
  switch (action.type) {
    case USER_REG:
      {
        let { userId, token, error } = await sendReg(action);
        action.userId = userId;
        action.token = token;
        action.error = error ? erorr : '';
        delete action.password;
        break;
      }
    case USER_LOGIN:
      {
        console.log('in USER_LOGIN')
        store.dispatch(userLoginStart());
        let { userId, userEmail, userAge, token } = await sendLogin(action);
        action.userId = userId;
        action.userEmail = userEmail;
        action.userAge = userAge;
        action.token = token;
        delete action.password;
        store.dispatch(userLoginFinish());
        break;
      }
  }
  return next(action);
};


//TODO Такие же функции в messageMiddleware - обощить и вынести с отдельный файл?
async function sendReg(action) {
  const newUser = {
    userName: action.userName,
    userEmail: action.userEmail,
    userAge: action.userAge,
    password: action.password,
  }
  const data = await fetch('/api/users', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });
  const res = await data.json();
  console.log('res', res);
  if (res.user) {
    return { userId: res.user._id, token: res.token };
  } else {
    return { error: res.error}
  }
}

async function sendLogin(action) {
  console.log('in profileMiddleware');
  console.log('action.userName:', action.userName);
  console.log('action.password:', action.password);
  const newUser = {
    userName: action.userName,
    password: action.password,
  }
  const data = await fetch('/api/users/login', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });
  const res = await data.json();
  console.log('res', res);
  
  if (res.user._id.length > 0) {
    return {
      userId: res.user._id,
      userEmail: res.user.userEmail,
      userAge: res.user.userAge,
      token: res.token,
    };
  }
}

// async function delFromServer(chatId) {
//   const data = await fetch(`/api/chat/${chatId}`, {
//     method: 'DELETE',
//   });
//   const res = await data.json();
//   return res.status;
// }
