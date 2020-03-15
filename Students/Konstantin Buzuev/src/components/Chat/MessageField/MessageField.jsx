import React, { Component } from "react";
// REDUX
import connect from "react-redux/es/connect/connect";
// MY COMPONENTS
import Message from "../Message/Message.jsx";
// STYLES
import { withStyles } from "@material-ui/core/styles";
import { Box, Fab, TextField, GridList, Grid } from "@material-ui/core";
const useStyles = theme => ({
  root: {
    display: "flex",
    flexWrap: "nowrap",
    overflowY: "hidden",
    overflowX: "hidden",
    backgroundColor: theme.palette.background.paper,
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%"
  },
  gridList: {
    width: "100%"
  }
});
class Messages extends Component {
  constructor(props) {
    super(props);
    this.messagesEndRef = React.createRef();
  }
  scrollToBottom = () => {
    this.messagesEndRef.current.lastElementChild.scrollIntoView({
      behavior: "smooth"
    });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  render() {
    const { classes } = this.props;
    let { messages } = this.props;
    let Messages = [];
    Object.keys(messages).forEach(key => {
      Messages.push(
        <Message
          key={key}
          sender={messages[key].user}
          text={messages[key].text}
        />
      );
    });
    return (
      <div className={classes.root}>
        <GridList
          className={classes.gridList}
          cols={1}
          spacing={0}
          ref={this.messagesEndRef}
        >
          {Messages}
        </GridList>
      </div>
    );
  }
}
const mapStateToProps = ({ messageReducer }, ownProps) => {
  const { chatID } = ownProps;
  const { messages } = messageReducer;
  let chatMessages = [];
  messages.forEach(message => {
    if (message.chatID === chatID) chatMessages.push(message);
  });
  return {
    messages: chatMessages
  };
};

export default connect(mapStateToProps)(withStyles(useStyles)(Messages));
