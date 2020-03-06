import React, {Component} from 'react';
import ReactDom from 'react-dom';

import { makeStyles } from '@material-ui/core/styles'
import { TextField, FloatingActionButton } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

import Message from '../Message/Message.jsx'

const useStyles = makeStyles(theme => ({
   root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.main,
      padding: 0
   },
}));

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
              user: this.props.user,
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
        let { user } = this.props
        const placeholder = `Пишите, ${user}`
        let MessagesArr = this.state.msgArray.map( (message, index) => 
          <Message
            sender={ message.user }
            text={ message.text }
            key={ index }
          />
        )

        return (
            <div className="msgs-body">
                <div className="msgs-list">
                    { MessagesArr }
                </div>
                    
                <div className="msgs-foot">
                        
                        <TextField
                          className="msg-input"
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
            </div>
                
        )
    }
}