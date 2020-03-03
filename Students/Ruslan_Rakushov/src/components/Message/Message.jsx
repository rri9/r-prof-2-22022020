import React from 'react';
import ReactDOM from 'react-dom';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
  
// import './Message.css';

const useStyles = makeStyles((props) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
    backgroundColor: 'skyblue',
    padding: '5px',
    margin: '5px 0',
    '& span': {
      fontWeight: 'bold',
    },
    '& p': {
      margin: '5px 0 0 0',
    },
    alignSelf: props => 
      props.msg.sender ? 'flex-end' : 'flex-start',
  },
  userAnswer: {
    alignSelf: 'flex-end',
  },
  botAnswer: {
    alignSelf: 'flex-start',
  }
}));

const Message = (props) => {
  const classes = useStyles(props);
  const sender = props.msg.sender ? props.msg.sender : 'Bot';
  const text = (props.msg.sender || props.msg.text) ? props.msg.text : 'Bot answering smth...';
  const msgStyle = props.msg.sender ? classes.userAnswer : classes.botAnswer;

  return (
    <Paper className = {classes.root}>
      <span className={msgStyle}> { sender }: </span>
        <p>{ text }</p>
    </Paper>
  );
};

export default Message;