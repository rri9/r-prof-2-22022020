import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Layout from '../components/Layout/Layout.jsx'

export default class Router extends Component {
   render() {
      return (
         <Switch>
            <Route exact path="/" component={ Layout } />
            <Route exact path="/chat/:chatId" 
                  render={ obj => <Layout chatId={ obj.match.params.chatId } /> } />
         </Switch>
      )
   }
}