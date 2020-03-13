import React ,{Component} from 'react';
import ReactDom from 'react-dom';
import { Grid } from '@material-ui/core';
import './style.css'
import { Toolbar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Typography } from '@material-ui/core';

import { List, ListItem } from 'material-ui/List'
import ContentSend from 'material-ui/svg-icons/content/send'
import {Link} from 'react-router-dom';

export default class ChatList extends Component {
    
    render() {
       
        
        return (
           <Grid container direction = 'column' className = 'column'>
                <Grid item className='chatCreate'>
                    <div className = 'line'>
                    <AddIcon className='plus'/>
                    <h3 className='hd'>Create chat</h3> 
                    
                    </div>
                    
                </Grid>

                        <Grid item>
                        <hr className= 'separate'></hr>
                        </Grid>

                        <List className = 'newChats'>

                        <Link to = '/chat/1'>
                        <ListItem primaryText= 'Chat1' leftIcon = {<ContentSend />} />
                        </Link>
                        
                        <Link to = '/chat/2'>
                        <ListItem primaryText= 'Chat2' leftIcon = {<ContentSend />} />
                            </Link>
                            
                            <Link to = '/chat/3'>
                            <ListItem primaryText= 'Chat3' leftIcon = {<ContentSend />} />
                            </Link>

                            <Link to = '/chat/4'>
                            <ListItem primaryText= 'Chat4' leftIcon = {<ContentSend />} />
                            </Link>
                            
                            
                           
                        </List>
                {/* <Grid item className = 'newChats'>
                    <div className = 'line'>
                    <AccountCircleOutlinedIcon className='prIcon'/> <h3 className='hd'>Chat1</h3>
                    </div>
                        
                </Grid> */}

           </Grid>
           
            
        )
    }
}