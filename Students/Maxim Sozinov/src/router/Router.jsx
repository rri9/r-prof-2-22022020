import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from '../components/Layout/Layout.jsx';

export default class Router extends React.Component {
   render() { 
      return (
         <Switch>
            <Route 
               exact
               path={ [
                  '/',
                  '/chat/:chatId'
               ] }
               component={ Layout }
            />
         </Switch>
      );
   }
}