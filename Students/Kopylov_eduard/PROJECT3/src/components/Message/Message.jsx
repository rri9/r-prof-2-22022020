import React from 'react';
import ReactDom from 'react-dom';
import { Grid } from '@material-ui/core';
import './style.css';


let msg = (props)=>{
    let { sender, text} = props;
    sender ? sender = sender : sender = 'Luke';
    

    return (

<Grid container className = 'grid'>
        <Grid item  className = 'msg'>
            <strong className= 'sender'>{sender} </strong>
            <p className = 'messageText'>{props.sender || (!props.sender && text) ? text: 'go away...'}</p>
        </Grid>
    
</Grid>


)
}

export default msg;