import React from 'react';
import ReactDom from 'react-dom';
import './style.css';

import MessagesField from '../MessagesField/MessagesField.jsx';
import ChatList from '../ChatList/ChatList.jsx';
import Header from '../Header/Header.jsx';
import PropTypes from 'prop-types';

import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';

//store
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Layout extends React.Component {
    static propTypes = {
        chatId: PropTypes.number,
    };

    static defaultProps = {
        chatId: 1
    };

    render() {
        return (
            <Container>
                    <Header chatId = {this.props.chatId}/>
        
                <Grid container direction = 'row'>
                        <Grid item xs={3}>
                        <ChatList />
                        </Grid>
                        
                        <Grid item xs={9}>
                        <MessagesField usr = {this.props.usr}/>
                
                
                        </Grid>
                    
                </Grid>
              
           </Container>
        )
    }

}


const mapStateToPops = ({}) => ({
})


export default connect(mapStateToPops)(Layout)