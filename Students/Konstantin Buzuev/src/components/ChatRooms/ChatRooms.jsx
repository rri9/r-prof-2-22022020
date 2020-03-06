import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import ChatIcon from "@material-ui/icons/Chat";
import ForumIcon from "@material-ui/icons/Forum";
import FeedbackIcon from "@material-ui/icons/Feedback";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

import { Link } from "react-router-dom";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function FolderList() {
  const classes = useStyles();

  return (
    <div>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Создать чат" />
        </ListItem>
      </List>
      <Divider />

      <List className={classes.root}>
        <Link to="/chat/1">
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ChatIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Room 1" secondary="First room" />
          </ListItem>
        </Link>
        <Link to="/chat/2">
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ForumIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Room 2" secondary="Second room" />
          </ListItem>
        </Link>
        <Link to="/chat/3">
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FeedbackIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Room 3" secondary="Third room" />
          </ListItem>
        </Link>
      </List>
    </div>
  );
}
