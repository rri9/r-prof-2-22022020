import React, { Component } from "react";
import ReactDom from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style.css";
import { Box, Fab, TextField, GridList, Grid } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

import Message from "../Message/Message.jsx";

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
    this.state.messages = [
      { user: "Darth Vader", text: "Hello, Luke!" },
      { user: null, text: null },
      { user: "Darth Vader", text: "I am your father" },
      { user: null, text: "NOOOOOOOOO" }
    ];
    this.state.message = "";
  }
  newMessage = () => {
    this.setState({
      messages: [
        ...this.state.messages,
        { user: this.user, text: this.state.message }
      ],
      message: ""
    });
    console.log(this.state.messsages);
  };

  handleChanges = event => {
    event.keyCode !== 13
      ? this.setState({ message: event.target.value })
      : this.newMessage();
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
    const msgs = this.state.messages;
    if (msgs.length % 2 === 1) {
      setTimeout(() => {
        this.setState({
          messages: [...this.state.messages, { user: null, text: "Hello!" }]
        });
      }, 500);
    }
    this.scrollToBottom();
  }

  render() {
    const { classes } = this.props;
    let Messages = this.state.messages.map(obj => {
      return <Message sender={obj.user} text={obj.text} />;
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
            onChange={this.handleChanges}
            onKeyUp={this.handleChanges}
            variant="outlined"
          />
          <Fab color="primary" onClick={this.newMessage}>
            <SendIcon />
          </Fab>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(Messages);
