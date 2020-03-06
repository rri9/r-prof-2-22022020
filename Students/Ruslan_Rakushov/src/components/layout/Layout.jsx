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

const msgs = [
  {
    sender: 'Me',
    text: 'Hello!',
  },
  {
    sender: null,
    text: null,
  },
  {
    sender: 'Me',
    text: 'How are You?',
  },
  {
    sender: null,
    text: null,
  },
];

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
        <Header chatId={this.props.chatId}/>
        <ChatList />
        <MessageField msgs={msgs} />
      </div>
    );
  };
}

export default withStyles(useStyles)(Layout);
