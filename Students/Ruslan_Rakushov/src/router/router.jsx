import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout.jsx';
import Profile from '../components/Profile/Profile.jsx';
import Register from '../components/Register/Register.jsx';
import Login from '../components/Login/Login.jsx';

export default class Router extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Layout} />
        {/* <Route exact path='/' component={Login} /> */}
        <Route exact path='/chat/:chatId/' render={ (obj) =>
          <Layout chatId={ Number(obj.match.params.chatId) } />
        } />
        <Route exact path='/profile/' component={Profile} />
        <Route exact path='/register/' component={Register} />
        <Route exact path='/login/' component={Login} />
      </Switch>
    );
  }
}
