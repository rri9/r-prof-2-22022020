import React from 'react';
import ReactDOM from 'react-dom';
import { Paper, IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { makeStyles } from '@material-ui/core/styles';
  
const useStyles = makeStyles((props) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
    backgroundColor: 'skyblue',
    padding: '5px',
    margin: '5px 0',
    '&:hover > div:last-child': {
      display: 'block',
      position: 'absolute',
      right: 0,
    },
    '&:hover > div:first-child': {
      opacity: '0.2',
    },
    alignSelf: props => 
      props.msg.sender === props.userName ? 'flex-end' : 'flex-start',
  },
  item: {
    '& span': {
      fontWeight: 'bold',
    },
    '& p': {
      margin: '5px 0 0 0',
    },
  },
  userAnswer: {
    alignSelf: 'flex-end',
  },
  botAnswer: {
    alignSelf: 'flex-start',
  },
  delBtn: {
    width: '24px',
    height: '24px',
    display: 'none',
    '& button': {
      padding: '0px',
      opacity: 1,
    },
  },
}));

const Message = (props) => {
  console.log('in MSG props.msg.sender=', props.msg.sender);
  console.log('in MSG props.userName=', props.userName);
  console.log((props.msg.sender === props.userName));
  
  const classes = useStyles(props);
  const sender = props.msg.sender ? props.msg.sender : 'Bot';
  const text = (props.msg.sender || props.msg.text) ? props.msg.text : 'Bot answering smth...';
  const msgStyle = (props.msg.sender === props.userName) ? classes.userAnswer : classes.botAnswer;
  const id = props.msg._id;
  
  return (
    <Paper className={classes.root}>
      <div className = {classes.item}>
        <span className={msgStyle}> { sender }: </span>
        <p>{ text }</p>
      </div>
      <div className={classes.delBtn}>
        <IconButton size='small'
          onClick={() => props.delMessage(id)}
        >
          <HighlightOffIcon />
        </IconButton>
      </div>
    </Paper>
  );
};

export default Message;