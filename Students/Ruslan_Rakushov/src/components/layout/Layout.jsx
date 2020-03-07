import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Header from '../Header/Header.jsx';
import ChatList from '../ChatList/ChatList.jsx';
import MessageField from '../MessageField/MessageField.jsx';

const useStyles = (theme => ({
  root: {
    width: '550px',
    display: 'flex',
  },
}));

//data - выпилить!
const chats = {
  1: { title: 'Чат 1', msgsList: [1, 2, 3, 4] },
  2: { title: 'Чат 2', msgsList: [5] },
  3: { title: 'Чат 3', msgsList: []},
};
const msgs = {
  1: {
    sender: 'Me',
    text: 'Hello!',
  },
  2: {
    sender: null,
    text: null,
  },
  3: {
    sender: 'Me',
    text: 'How are You?',
  },
  4: {
    sender: null,
    text: null,
  },
  5: {
    sender: null,
    text: 'Hello, human!',
  }
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
        <ChatList />
        <MessageField msgs={msgs} chats={chats} chatId={this.props.chatId}/>
      </div>
    );
  };
}

export default withStyles(useStyles)(Layout);
