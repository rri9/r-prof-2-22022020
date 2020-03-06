import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout.jsx";

export default class Router extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Layout user={this.props.user} />}
        />
        <Route
          exact
          path="/chat/1"
          render={() => <Layout user={this.props.user} chatId="1" />}
        />
        <Route
          exact
          path="/chat/2"
          render={() => <Layout user={this.props.user} chatId="2" />}
        />
        <Route
          exact
          path="/chat/3"
          render={() => <Layout user={this.props.user} chatId="3" />}
        />
      </Switch>
    );
  }
}
