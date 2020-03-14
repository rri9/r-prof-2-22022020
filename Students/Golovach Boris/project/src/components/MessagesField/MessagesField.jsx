import React, {Component} from 'react';
import ReactDom from 'react-dom';

import Message from '../Message/Message.jsx'

//material-ui
import { TextField, FloatingActionButton } from 'material-ui';
import Button from '@material-ui/core/Button';

//actions
import { sendMessage } from '../../store/actions/messages_actions.js'

//redux
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'

class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: '',
        }
    }
    //methods
    sendMessage = (text, sender) => {
        const { chatId } = this.props
        const messages = this.props.messages[chatId]
        const messageId = Object.keys(messages).length + 1;

        this.props.sendMessage(messageId, sender, text, chatId)
    }

    handleSendMessage = (message, sender) => {
        this.setState({ msg: '' })
        if (sender == 'Darth Vader') {
            this.sendMessage(message, sender)
        }
    }

    handleChange = (evt) => {
        if (evt.keyCode !== 13) {
            this.setState ({msg: evt.target.value})
        }
            //this.sendMessage(evt)
    }
    
    render() {
        //let user = this.props.usr
        let usr = 'Darth Vader'
        let { messages, chatId } = this.props
        let MessagesArr = []
        let numberChat = messages[chatId]
        Object.keys(numberChat).forEach(key => {
            MessagesArr.push(<Message 
                sender={ numberChat[key].user } 
                text={ numberChat[key].text }
                key={ key }
            />)
        })
 
        return (
            <div className="container-fluid align-items-center">
                <div className="col-md-3">
                    <div className="header">
                        <h2>ReactGram &copy;</h2>
                        <p>Hello { usr }!</p>
                    </div>
                    <div className="messagesBlock">
                        { MessagesArr }
                    </div>
                    <TextField
                        label="Введите сообщение"
                        fullWidth
                        margin="normal"
                        onChange = { this.handleChange } 
                        onKeyUp = { this.handleChange }
                        value = { this.state.msg }
                    />
                    <Button fullWidth variant="contained" color="primary" onClick = { 
                            () => this.handleSendMessage (this.state.msg, 'Darth Vader') 
                        }>Send
                    </Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ msgReducer }) => ({
    messages: msgReducer.messages
})

const mapDispatchToProps = dispatch => bindActionCreators( { sendMessage }, dispatch )

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
