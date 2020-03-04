import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { withStyles } from '@material-ui/core/styles';

import Header from '../Header/Header.jsx';
import ChatList from '../ChatList/ChatList.jsx';
import MessageField from '../MessageField/MessageField.jsx';

const useStyles = (theme => ({
  root: {
    width: '550px',
    display: 'flex',
  },
}));

class Layout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header />
        <ChatList />
        <MessageField msgs={this.props.msgs} />
      </div>
    );
  };
}

export default withStyles(useStyles)(Layout);