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

import { sendMessage } from '../../store/actions/messages_action.js';

import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

class Messages extends Component {

    messagesEndRef = React.createRef()

    constructor(props) {
        super(props);
        this.user = props.usr;
        this.state = {
            msg: ''
        }
    }

    handleChanges = (event) => {
        event.keyCode !== 13 ?
            this.setState({msg: event.target.value}) :
            this.newMessage('Alex', this.state.msg);
    }

    // componentDidUpdate() {
    //     const { messages } = this.props;
    //     console.log(Object.keys(messages).length);
    //     if (Object.keys(messages).length % 2 === 1) {
    //         setTimeout(() => {
    //             this.newMessage(null, 'NOOOOOOOOO')
    //         }, 500);
    //     }
    // }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.messagesEndRef.current.lastElementChild.scrollIntoView({ behavior: 'smooth' })
    }

    newMessage = (sender, text) => {
        const { messages } = this.props;
        const messageId = Object.keys(messages).length + 1;
        this.props.sendMessage(messageId, sender, text);
        this.setState({msg: ''});
        setTimeout(() => {
            const { messages } = this.props;
            const messageId = Object.keys(messages).length + 1;
            this.props.sendMessage(messageId, null, 'NOOOOOOOOOO');
        }, 500);
    }

    render() {
        const { classes } = this.props;
        const { messages } = this.props;
        const renderMessages = Object.keys(messages).map(messageId => {
            return (
                <Message 
                    key={ messageId } 
                    sender={ messages[messageId].user } 
                    text={ messages[messageId].text }
                />
            )
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
                    onClick={() => this.newMessage('Alex', this.state.msg)} >
                    <SendIcon />
                </Fab>
            </div>
        )
    }
}

const mapStateToProps = ({ msgReducer }) => ({
    messages: msgReducer.messages
});
const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Messages))