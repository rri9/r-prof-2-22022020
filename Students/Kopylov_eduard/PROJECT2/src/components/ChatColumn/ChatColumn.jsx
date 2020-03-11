import React ,{Component} from 'react';
import ReactDom from 'react-dom';
import { Grid } from '@material-ui/core';
import './style.css'
import { Toolbar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Typography } from '@material-ui/core';
export default class ChatColumn extends Component {
    constructor(props)
    {
        super(props);
       

    };

    
    
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
          <Grid item className = 'newChats'>
            <div className = 'line'>
            <AccountCircleOutlinedIcon className='prIcon'/> <h3 className='hd'>Chat1</h3>
            </div>
                
          </Grid>

           </Grid>
           
            
        )
    }
}