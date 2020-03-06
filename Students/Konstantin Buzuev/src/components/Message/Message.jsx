import React, { Component } from "react";
import ReactDom from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

import "./style.css";

const useStyles = theme => ({
  rootL: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start"
  },
  rootR: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end"
  },
  paperR: {
    width: "50%",
    backgroundColor: "#4791db",
    padding: "5px 10px",
    borderRadius: "10px",
    fontSize: "16px",
    margin: "5px",
    color: "white"
  },
  paperL: {
    width: "50%",
    backgroundColor: "#e33371",
    padding: "5px 10px",
    borderRadius: "10px",
    fontSize: "16px",
    margin: "5px",
    color: "white"
  }
});

class Message extends Component {
  constructor(props) {
    super(props);
    this.sender = this.props.sender ? this.props.sender : "Bot";
    this.text = this.props.text ? this.props.text : "Sorry, I'm busy ...";
  }
  render() {
    const { classes } = this.props;
    const root = this.sender === "Bot" ? classes.rootL : classes.rootR;
    const bgcolor = this.sender === "Bot" ? classes.paperL : classes.paperR;
    return (
      <div className={root}>
        <Paper className={bgcolor}>
          <strong>{this.sender}</strong>
          <p>{this.text}</p>
        </Paper>
      </div>
    );
  }
}

export default withStyles(useStyles)(Message);
