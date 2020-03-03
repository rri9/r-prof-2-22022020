import React, {Component } from 'react';
import ReactDom from 'react-dom';
import {withStyles} from '@material-ui/core/styles';
import styles from './style.css';

import Message from '../Message/Message.jsx';
import { Box, Fab, TextField, GridList } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send'; 

const useStyles = (theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: '100%',
      maxHeight: 'calc(100vh - 120px)',
    }
  }));

class Messages extends Component {

    messagesEndRef = React.createRef()

    constructor(props) {
        super(props);
        this.user = props.usr;
        this.state = {
            messages: [
                {
                    user: 'Alex',
                    text: 'hello'
                },
                {
                    user: null,
                    text: null
                },
                {
                    user: 'Anna',
                    text: 'Hi'
                },
                {
                    user: null,
                    text: null
                },
                {
                    user: 'Alex',
                    text: 'hello'
                },
                {
                    user: null,
                    text: null
                },
                {
                    user: 'Anna',
                    text: 'Hi'
                },
                {
                    user: null,
                    text: null
                },
                {
                    user: null,
                    text: null
                },
                {
                    user: 'Anna',
                    text: 'Hi'
                },
                {
                    user: null,
                    text: null
                }
            ],
            msg: ''
        }
    }

    handleChanges = (event) => {
        event.keyCode !== 13 ?
            this.setState({msg: event.target.value}) :
            this.newMessage();
    }

    componentDidMount () {
        this.scrollToBottom()
    }

    componentDidUpdate() {
        const msgs = this.state.messages;
        if (msgs.length % 2 === 1) {
            setTimeout(() => {
                this.setState(
                    {
                        messages: [...this.state.messages, {user: null, text: 'NOOOOOOOOO'}]
                    }
                );
            }, 500);
        }
        this.scrollToBottom()
    }

    newMessage = () => {
        this.setState(
            {
                messages: [...this.state.messages, {user: this.user, text: this.state.msg}],
                msg: ''
            }
        );
    }

    scrollToBottom = () => {
        this.messagesEndRef.current.lastElementChild.scrollIntoView({ behavior: 'smooth' })
    }

    render() {
        const { classes } = this.props;
        const renderMessages = this.state.messages.slice().map((obj, index) => {
            return <Message key={index} sender={obj.user} text={obj.text}/>
        })
        return (
            <div className={ classes.root}>
                <GridList className={ classes.gridList } cols={ 1 } spacing={ 0 } ref={this.messagesEndRef}>
                    {renderMessages}
                </GridList>
                <TextField 
                    className="flex-grow-1"
                    label="Новое сообщение"
                    value={this.state.msg}
                    onChange={this.handleChanges} 
                    onKeyUp={this.handleChanges}
                    variant="outlined"
                />
                <Fab 
                    color="primary" 
                    onClick={this.newMessage} >
                    <SendIcon />
                </Fab>
            </div>
        )
    }
}

export default withStyles(useStyles)(Messages)