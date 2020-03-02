import React, {Component} from 'react';
import ReactDom from 'react-dom';

import { TextField, FloatingActionButton } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

import Message from '../Message/Message.jsx'

export default class Messages extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
          msgArray: [
            {
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
            }
          ]
        }
    }

    sendMessage = (e) => {
        this.setState ({
            msgArray: [...this.state.msgArray, {
              user: this.props.usr,
              text: this.state.msg
            }],
            msg: '' // clear input field
        })
    }

    handleChange = (e) => {
        e.keyCode === 13 ? this.sendMessage(e)
          : this.setState ({msg: e.target.value})
    }
    
    componentDidUpdate () {
        if (this.state.msgArray.length % 2 === 1) {
            setTimeout(() => {
                this.setState ({
                    msgArray: [...this.state.msgArray, 
                      {
                        user: null,
                        text: 'у меня все ходы записаны, кстати...' 
                      }
                    ],
                    msg: ''
                })
            }, 500)
        }
    }
    
    render() {
        let { usr } = this.props
        const placeholder = `Пишите, ${usr}`
        let MessagesArr = this.state.msgArray.map( (message, index) => 
          <Message
            sender={ message.user }
            text={ message.text }
            key={ index }
          />
        )

        return (
            <div className="wrapper">
            
                <h2>ReactGram&trade;</h2>
                
                <p>Hello { usr }!</p>
                
                { MessagesArr }
                
                <footer className="fixed-bottom">
                
                    <div className="d-flex justify-center align-center">
                    
                        
                        <TextField
                          variant = "outlined"
                          placeholder = { placeholder }
                          onChange = { this.handleChange }
                          onKeyUp = { this.handleChange }
                          value = { this.state.msg || ''}
                        />
                        &nbsp;
                        <Fab
                          color="primary"
                          aria-label="add"
                          onClick = { this.sendMessage }
                        >
                          <Icon>send</Icon>
                        </Fab>

                    </div>
                    
                </footer>
                
            </div>
        )
    }
}