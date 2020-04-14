import React from 'react';

// UI
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
      props.msg.senderId === props.currentUserId ? 'flex-end' : 'flex-start',
  },
  item: {
    '& span': {
      fontWeight: 'bold',
    },
    '& p': {
      margin: '5px 0 0 0',
    },
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
  },
  anotherUserMessage: {
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
  const classes = useStyles(props);
  const { _id, senderId, sender, text } = props.msg;
  const msgStyle = (senderId === props.currentUserId) ? classes.currentUserMessage : classes.anotherUserMessage;
  
  return (
    <Paper className={classes.root}>
      <div className = {classes.item}>
        <span className={msgStyle}> { sender }: </span>
        <p>{ text }</p>
      </div>
      <div className={classes.delBtn}>
        <IconButton size='small'
          onClick={() => props.delMessage(_id)}
        >
          <HighlightOffIcon />
        </IconButton>
      </div>
    </Paper>
  );
};

export default Message;
