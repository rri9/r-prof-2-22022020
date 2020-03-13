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
        {/* //TODO Выпилить chatId, т.к. он теперь в storage
            //TODO Исправить все пропы chatId на currentChatId из storage
         */}
        <Header chatId={this.props.chatId} />
        <ChatList selectedIndex={this.props.chatId - 1}/>
        <MessageField chatId={this.props.chatId}/>
      </div>
    );
  };
}

const mapStateToProps = ({ }) => ({ });

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Layout));
