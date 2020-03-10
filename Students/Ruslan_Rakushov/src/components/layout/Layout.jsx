import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Header from '../Header/Header.jsx';
import ChatList from '../ChatList/ChatList.jsx';
import MessageField from '../MessageField/MessageField.jsx';

// //redux
// import { bindActionCreators } from 'redux';
// import connect from 'react-redux/es/connect/connect';

const useStyles = (theme => ({
  root: {
    width: '550px',
    display: 'flex',
  },
}));

//data - выпилить!
const chats = {
  1: { title: 'Чат 1', msgsCount: 4 },
  2: { title: 'Чат 2', msgsCount: 1 },
  3: { title: 'Чат 3', msgsCount: 0 },
};

class Layout extends Component {
  static propTypes = {
    chatId: PropTypes.number,
  };
  static defaultProps = {
    chatId: 1,
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header chats={chats} chatId={this.props.chatId} />
        <ChatList selectedIndex={this.props.chatId - 1}/>
        <MessageField chats={chats} chatId={this.props.chatId}/>
      </div>
    );
  };
}

export default withStyles(useStyles)(Layout);
