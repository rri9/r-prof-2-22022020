import React from 'react'
import './style.css'
import { Grid } from '@material-ui/core';


import Messages from '../MessagesField/MessagesField.jsx'
import Chats from '../ChatList/ChatList.jsx'
import { withStyles } from '@material-ui/core/styles'

//store
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Layout extends React.Component {
    
    render() {
        return(
            <div className="container">
                <Grid container spacing={0}>
                    <Grid item xs={3} >
                        <Chats />
                    </Grid>
                    <Grid item xs={9} >
                        <Messages usr={ this.props.usr } />
                    </Grid>
                </Grid>
            </div>
        )
    }
}
const mapStateToProps = ({ }) => ({ })
 
 export default connect(mapStateToProps)(Layout)
 