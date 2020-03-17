import React from 'react';
import ReactDom from 'react-dom';
import {Switch, Route} from 'react-router-dom';
import Layout from '../components/Layout/Layout.jsx';
import connect from "react-redux/es/connect/connect";

class Router extends React.Component{
    render() {
         const {chats} = this.props;
         //console.log('chats: ', chats);
         let Routes = [];

        Object.keys(chats).forEach(key => {
            Routes.push(
              <Route
               key = {key}
                exact
                path={"/chat/" + key}
                render={() => <Layout  chatId={key} />}
              />
            );
          });
          
        return (
            <Switch>
            
            <Route exact path = "/" component = { Layout}/>
            {/* <Route exact path = "/chat/1/" render = {
                () => <Layout chatId = {1} />
            }/>
            <Route exact path = "/chat/2/" render = {
                () => <Layout chatId = {2} />
            }/>
            <Route exact path = "/chat/3/" render = {
                () => <Layout chatId = {3} />
            }/>
            <Route exact path = "/chat/4/" render = {
                () => <Layout chatId = {4} />
            }/> */}
            {Routes}
               
                
            </Switch>
        )
    }
}

const mapStateToProps = ({ chatReducer }) => {
    return {
      chats: chatReducer.chats
    };
  };
export default connect(mapStateToProps)(Router);