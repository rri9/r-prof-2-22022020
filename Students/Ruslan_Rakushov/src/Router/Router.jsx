import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../Components/Login/Login.jsx';
import ChatList from '../Components/ChatList/ChatList.jsx';
import Registration from '../Components/Registration/Registration.jsx';

export default class Router extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/registration' component={Registration} />
        <Route exact path='/chats' component={ ChatList }/>
      </Switch>
    );
  }
}