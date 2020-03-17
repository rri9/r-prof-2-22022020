import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Header from '../Header/Header.jsx';
import ChatList from '../ChatList/ChatList.jsx';
import MessageField from '../MessageField/MessageField.jsx';

//redux
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

const useStyles = (theme => ({
  root: {
    width: '550px',
    display: 'flex',
  },
}));

class Layout extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header />
        <ChatList />
        <MessageField />
      </div>
    );
  };
}

const mapStateToProps = ({ }) => ({ });

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Layout));
