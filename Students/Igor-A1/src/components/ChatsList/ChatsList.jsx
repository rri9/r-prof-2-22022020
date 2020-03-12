import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { List, 
         ListItem, 
         ListItemAvatar, 
         ListItemText,
         Box,
         TextField,
         InputAdornment,
         Avatar,
         Icon,
         Badge, 
         Divider } from "@material-ui/core";
         
import { withStyles } from '@material-ui/core/styles'
import { indigo, purple, blue } from '@material-ui/core/colors';

const useStyles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    color: indigo["400"],
    padding: 0
  },
  item: {
    '&:link, $:visited': {
      color: indigo["400"],
    },
    '&:hover, &:active': {
       backgroundColor: theme.palette.hovered,
       color: theme.palette.common.white,
    },
    '&.Mui-selected': {
      backgroundColor: indigo["300"],
      color: blue["100"],
      '& .MuiAvatar-circle': {
        backgroundColor: indigo["50"],
        color: blue["300"],
      },
      '&:hover, &:active': {
        backgroundColor: purple["400"],
        color: purple["50"],
        '& .MuiAvatar-circle': {
          backgroundColor: purple["50"],
          color: purple["300"],
        },
      }
    },
  },
  avatar: {
    backgroundColor: theme.palette.common.white,
    color: indigo["300"]
  },
  foot: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary,
    padding: theme.spacing(2)
  },
  input: {
   color: "#FFF59D", // Yellow_50["200"]
  }
});

import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import { addChat } from '../../store/actions/chats_actions' ;

class ChatsList extends Component {
  static propTypes = {
    chats: PropTypes.object.isRequired,
    addChat: PropTypes.func.isRequired,
    classes: PropTypes.object,
  };

  state = {
    input: '',
    selectedIndex: 0
  };

  handleListItemClick = (e, index) => {
    this.setState({selectedIndex: index});
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  };

  handleKeyUp = e => {
    if(e.keyCode === 13) {
      this.handleAdd()
    };
  }

  handleAdd = () => {
    if(this.state.input !== '') {
      this.props.addChat(this.state.input)
      this.setState({ input: '' })
    };
  };
  
  render() {
    const { classes, chats } = this.props;
    //console.log(this.props);
    
    const chatsArray = [];
    Object.keys(chats).forEach((key, index) => {
      chatsArray.push((
        <Link to={ `/chat/${key}` } style={{ textDecoration: 'none' }} key={ key }>
          <ListItem
            button
            className={ classes.item } 
            selected={this.state.selectedIndex === index}
            onClick={ e => this.handleListItemClick(e, index)}
          >
            <ListItemAvatar>
              <Avatar className={ classes.avatar } ><Icon>chat</Icon></Avatar>
            </ListItemAvatar>
            <ListItemText primary={ chats[key].title } />
          </ListItem>
          <Divider variant="middle" component="li" />
        </Link>
      ))
    });
    
    return (
        <div className="chats-body">
          <List className={ `chats-list ${classes.root}` }>
            { chatsArray }
          </List>
          
          <Divider variant="middle" />
          
          <Box className={ `chats-foot ${classes.foot}` }>
            <TextField
              className="chat-input"
              name="input"
              color="secondary"
              variant = "filled"
              placeholder="Добавить чат ..."
              onChange = { this.handleChange }
              onKeyUp = { this.handleKeyUp }
              value = { this.state.input || '' }
              InputProps={{ className: classes.input }}
            />
          </Box>
      </div>
    );
  };
};



const mapStateToProps = ({ chatsReducer }) => ({
  chats: chatsReducer.chats
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addChat }, dispatch);

export default
  connect(mapStateToProps, mapDispatchToProps)
    (withStyles(useStyles)(ChatsList));
