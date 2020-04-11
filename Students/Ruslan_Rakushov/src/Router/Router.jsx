import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Registration from '../components/Registration/Registration.jsx';
import Layout from '../Components/Layout/Layout.jsx';

export default class Router extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={ Layout }/>
      </Switch>
    );
  }
}