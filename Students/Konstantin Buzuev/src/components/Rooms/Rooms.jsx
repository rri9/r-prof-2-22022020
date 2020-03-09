import React, { Component } from "react";
import PropTypes from "prop-types";
// MY COMPONENTS
import RoomList from "./RoomList/RoomList.jsx";
import RoomManager from "./RoomManager/RoomManager.jsx";
// COMPONENTS
import Divider from "@material-ui/core/Divider";
// STYLES
import { withStyles } from "@material-ui/core/styles";

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

class Rooms extends Component {
  render() {
    return (
      <div>
        <RoomManager />
      </div>
    );
  }
}

export default withStyles(useStyles)(Rooms);

/*
        <Divider />
        <RoomList />

*/
