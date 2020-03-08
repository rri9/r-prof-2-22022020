import React, { Component } from "react";
import ReactDom from "react-dom";
// ACTIONS
import { sendMessage } from "../../store/actions/messages_actions.js";
// REDUX
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
// COMPONENTS
import Message from "../Message/Message.jsx";
// STYLES
import { withStyles } from "@material-ui/core/styles";
import styles from "./style.css";
import { Box, Fab, TextField, GridList, Grid } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
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
  },
  bottomPanel: {
    padding: "10px"
  }
});

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.message = "";
    this.messagesEndRef = React.createRef();
  }
  sendMessage = (text, sender) => {
    const { messages } = this.props;
    const chatId = this.props.chatId;
    const messageID = Object.keys(messages).length + 1;
    this.props.sendMessage(chatId, messageID, sender, text);
  };

  handleSendMessage(message, sender) {
    this.sendMessage(message, sender);
    if (sender === this.props.user) {
      setTimeout(() => {
        this.sendMessage(null, null);
      }, 300);
    }
    this.setState({ message: "" });
  }

  handleChange = event => {
    if (event.keyCode !== 13) this.setState({ message: event.target.value });
    else this.handleSendMessage(this.state.message, this.props.user);
  };

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
        <Grid
          className={classes.bottomPanel}
          container
          direction="row"
          justify="space-between"
          align-items="flex-start"
          spacing={1}
        >
          <TextField
            className="flex-grow-1"
            label="Новое сообщение"
            value={this.state.message}
            onChange={this.handleChange}
            onKeyUp={this.handleChange}
            variant="outlined"
          />
          <Fab
            color="primary"
            onClick={() =>
              this.handleSendMessage(this.state.message, this.props.user)
            }
          >
            <SendIcon />
          </Fab>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ msgReducer }, ownProps) => {
  const { chatId } = ownProps;
  return {
    messages: msgReducer.chats[chatId].messages
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ sendMessage }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Messages));
