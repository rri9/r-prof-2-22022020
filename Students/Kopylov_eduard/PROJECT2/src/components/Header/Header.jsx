import React ,{Component} from 'react';
import ReactDom from 'react-dom';
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Input } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { makeStyles } from '@material-ui/core/styles';
import EmailSharpIcon from '@material-ui/icons/EmailSharp';
import { Grid } from '@material-ui/core';


const useStyles = makeStyles({
   
    input_line: {
        color: 'white',
        borderBottom: '2px solid color: #074f03',
        marginLeft: '30px'
    },
    mail:{
       position: 'absolute',
       right: '0',
       paddingRight: '24px',
       color: '#074f03'
    },
    searchIcon:{
        marginLeft:'14px',
        color: '#074f03'
    },
    toolBar: {
        position: 'relative'
    },
    notiFication:{
        position : 'absolute',
        right: '64px',
        color: '#074f03'
    },

    Bar:{
        backgroundColor: '#1b9403'
    },
    menu: {
        color: '#074f03'
    }
  });
  

export default function Hook() {
    const classes = useStyles();
    
        return (
          
            <AppBar className = {classes.Bar}>
            
               <Toolbar className = {classes.toolBar}>
              
                <Grid container>
                <MenuIcon className= {classes.menu} />
                    
                    <Input placeholder = "search text..."  className= {classes.input_line}/>
                    <SearchIcon className= {classes.searchIcon}/>
                    <NotificationsIcon className = {classes.notiFication}/>
                    <EmailSharpIcon className= {classes.mail}/>
                    </Grid>
              
               
               </Toolbar>
           </AppBar>
           
          
            
        )
    
}
