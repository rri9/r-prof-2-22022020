import React ,{Component} from 'react';
import ReactDom from 'react-dom';
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Input } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EmailSharpIcon from '@material-ui/icons/EmailSharp';
import SettingsIcon from '@material-ui/icons/Settings';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import './style.css';

  export default class Header extends React.Component{
        static propTypes = {
            chatId: PropTypes.number,
        }

        static defaultProps = {
            chatId: 1
        }

        render () {

            return (
          
                <AppBar className = "Bar">
                
                   <Toolbar className = "toolBar">
                  
                    <Grid container wrap = "nowrap">

                        <Grid  container item className = "LeftIcons" justify="flex-start" alignItems = "center" spacing = {2}>
                            <Grid item className = "menu" ><MenuIcon /></Grid>
                            <Grid item className= "input_line" ><Input placeholder = "search text..." /></Grid>
                            <Grid item className=" searchIcon"><SearchIcon /></Grid>
                        </Grid>
                      
                        
                       
                        

                        <Grid container item className = "ChatName" justify="center" alignItems = "center">
                            <h1 className = 'chatHeader'>ChatRoom {this.props.chatId}</h1>
                        </Grid>

                        <Grid container item className = "RightIcons" justify="flex-end" alignItems = "center" spacing = {2} >
                            <Grid item className =" notiFication" ><NotificationsIcon /></Grid>
                            <Grid item className= "mail"><EmailSharpIcon /></Grid>
                            <Grid item className = "settings"><SettingsIcon /></Grid>
                        </Grid>
                        
                        
                        </Grid>
                  
                   
                   </Toolbar>
               </AppBar>
               
              
                
            )
        }
  }

