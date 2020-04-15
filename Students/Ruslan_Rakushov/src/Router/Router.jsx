import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../Components/Login/Login.jsx';
import Registration from '../Components/Registration/Registration.jsx';
import ChatList from '../Components/ChatList/ChatList.jsx';
import MessageField from '../Components/MessageField/MessageField.jsx';
import Profile from '../Components/Profile/Profile.jsx';

export default class Router extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/registration' component={Registration} />
        <Route exact path='/chats'>
          <ChatList />
          <MessageField />
        </Route>
        <Route exact path='/chat/:chatId/' >
          <ChatList />
          <MessageField />
        </Route>
        <Route exact path='/profile' component={Profile} />
      </Switch>
    );
  }
}