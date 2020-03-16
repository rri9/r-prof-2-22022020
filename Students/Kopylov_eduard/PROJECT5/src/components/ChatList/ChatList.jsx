import React ,{Component} from 'react';
import ReactDom from 'react-dom';
import { Grid } from '@material-ui/core';
import './style.css'
import { Toolbar } from '@material-ui/core';
import AddIcon from 'material-ui/svg-icons/content/add'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Typography } from '@material-ui/core';

import { List, ListItem } from 'material-ui/List'
import ContentSend from 'material-ui/svg-icons/content/send'
import {Link} from 'react-router-dom';
import {TextField} from 'material-ui';

import {addChat} from '../../store/actions/chat_actions.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';



class ChatList extends Component {

    state = {
        input: ''
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

    handleKeyUp = (event) => {
        if (event.keyCode === 13){
            this.handleAdd()
            
        }
    }

    handleAdd = () => {
            if(this.state.input !== ''){
                this.props.addChat(this.state.input)
                this.setState({input: ''})
            }
    }
    
    render() {
       
        let {chats} = this.props;
        let chatsArray = [];
        Object.keys(chats).forEach(key => {chatsArray.push(
            
            <Link key = {key} to = {`/chat/${key}`}>
            <ListItem primaryText= {chats[key].title} leftIcon = {<ContentSend />} />
            </Link>
        )});
        
        return (

                        <List className = "newChats">

                        {/* <Link to = '/chat/1'>
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
                            </Link> */}
                            
                            { chatsArray }
                <ListItem 
                    key="Add new chat"
                    leftIcon = { <AddIcon /> }
                    onClick = { this.handleAdd }
                    children = {
                        <TextField 
                            key="textField"
                            name="input"
                            hintText="Add new chat"
                            onChange = { this.handleChange }
                            value = { this.state.input }
                            onKeyUp = { this.handleKeyUp }
                            
                        />
                    }
                />
                        </List>



        
           
            
        )
    }
}


const mapStateToPops = ({chatReducer}) => ({
    chats: chatReducer.chats
})
const mapDispatchToProps = dispatch => bindActionCreators({addChat},dispatch)

export default connect(mapStateToPops, mapDispatchToProps)(ChatList)