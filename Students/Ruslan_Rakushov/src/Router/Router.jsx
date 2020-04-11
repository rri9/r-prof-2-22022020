import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Registration from '../components/Registration/Registration.jsx';
import ChatList from '../Components/ChatList/ChatList.jsx';

export default class Router extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={ ChatList }/>
      </Switch>
    );
  }
}