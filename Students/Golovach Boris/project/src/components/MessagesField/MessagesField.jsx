import React, {Component} from 'react';
import ReactDom from 'react-dom';

import Message from '../Message/Message.jsx'
//
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//

export default class Messages extends Component {
    constructor(props) {
        super(props)
        //где-то тут... 
        this.state = {
            msg: '',
            msgArray: [{
                user: 'Darth Vader',
                text: 'Hallo'
            },
            {
                user: null,
                text: null
            },
            {
                user: 'Darth Vader',
                text: 'I am your father'
            },
            {
                user: null,
                text: 'NOOOOOOOOO'
            }]
        }
    }
    //methods
    sendMessage = (e) => {
        this.setState ({
            msgArray: [...this.state.msgArray, { user: this.props.usr, text: this.state.msg }], //ЯМы Дартвейдер
            msg: ''
        })
        // e.target.value = ''
    }

    handleChange = (evt) => {
        evt.keyCode !== 13 ?
            this.setState ({msg: evt.target.value}) :
            this.sendMessage(evt)
    }

    //hooks
    componentDidUpdate () {
        // console.log ('updated')
        let msgs = this.state.msgArray

        if (msgs.length % 2 === 1) {
            setTimeout(() => {
                this.setState ({
                    msgArray: [...this.state.msgArray, { user: null, text: 'NOOOOOOOOOO...' }], //ЯМы Дартвейдер
                    msg: ''
                })
            }, 500)
        }
    }

    render() {
        //let user = this.props.usr
        let { usr } = this.props
        let { msgArray } = this.state
        
        let MessagesArr = msgArray.map(message => <Message sender={ message.user } text={ message.text }/>)

        return (
            <div className="container-fluid align-items-center">
                    <div className="col-md-3">
                    <div className="header">
                        <h2>ReactGram</h2>
                        <p>Hello { usr }!</p>
                    </div>
                    <div>
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
                    <Button fullWidth variant="contained" color="primary" onClick = { this.sendMessage }>Send</Button>
                </div>
            </div>
        )
    }
}