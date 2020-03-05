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
    flexWrap: "wrap",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    flexDirection: "column",
    alignItems: "flex-start",
    justify: "space-between"
  },
  gridList: {
    width: "100%",
    maxHeight: "calc(100vh - 120px)"
  },
  bottomPanel: {
    padding: "10px"
  }
});

class Messages extends Component {
  messagesEndRef = React.createRef();

  constructor(props) {
    super(props);
    this.user = props.user;
    this.state = {};
    this.state.message = "";
  }
  sendMessage = (text, sender) => {
    const { messages } = this.props;
    const messageID = Object.keys(messages).length + 1;
    this.props.sendMessage(messageID, sender, text);
  };

  handleSendMessage(message, sender) {
    this.sendMessage(message, sender);
    if (sender === this.user) {
      setTimeout(() => {
        this.sendMessage(null, null);
      }, 300);
    }
    this.setState({ message: "" });
  }

  handleChange = event => {
    if (event.keyCode !== 13) this.setState({ message: event.target.value });
    else this.handleSendMessage(this.state.message, this.user);
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
              this.handleSendMessage(this.state.message, this.user)
            }
          >
            <SendIcon />
          </Fab>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ msgReducer }) => ({
  messages: msgReducer.messages
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ sendMessage }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Messages));
