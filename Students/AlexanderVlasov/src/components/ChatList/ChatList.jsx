import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList() {

  return (
    <div>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Создать чат" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItemLink href="#1">
          <ListItemText primary="Chat 1" />
        </ListItemLink>
        <ListItemLink href="#2">
          <ListItemText primary="Chat 2" />
        </ListItemLink>
      </List>
    </div>
  );
}
