import React from 'react'
import ReactDom from 'react-dom'

import { Link } from 'react-router-dom'

import { List, 
         ListItem, 
         ListItemAvatar, 
         ListItemText, 
         Avatar, 
         Badge, 
         Divider } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
   root: {
      height: 'calc(100vh - 145px)',
      padding: theme.spacing(1, 0),
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.common.white
   },
   item: {
      '&:hover, &:active': {
         backgroundColor: theme.palette.primary.light,
      },
   },
   selected: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      '&>.MuiListItemAvatar-root>.makeStyles-avatar-186': {
         backgroundColor: theme.palette.secondary.main,
         color: theme.palette.common.white
      }
   },
   avatar: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main
   }
}))

let chat = (props) => {

   const classes = useStyles()
   const { chatId } = props

   return (
      <List className={classes.root}>
         <Link to="/chat/1">
            <ListItem button className={classes.item, classes.selected}>
               <ListItemAvatar>
                  <Avatar className={classes.avatar}>H</Avatar>
               </ListItemAvatar>
               <ListItemText primary="HelpDesk" secondary="We'll call you back!" />
            </ListItem>
         </Link>
         <Divider variant="inset" component="li" />
         <Link to="/chat/2">
            <ListItem button className={classes.item}>
               <ListItemAvatar>
                  <Badge color="secondary" overlap="circle" variant="dot">
                     <Avatar className={classes.avatar}>DV</Avatar>
                  </Badge>
               </ListItemAvatar>
               <ListItemText primary="Darth Vader" secondary="Luke, I'm your father!" />
            </ListItem>
         </Link>
         <Divider variant="inset" component="li" />
         <Link to="/chat/3">
            <ListItem button className={classes.item}>
               <ListItemAvatar>
               <Avatar className={classes.avatar}>SW</Avatar>
               </ListItemAvatar>
               <ListItemText primary="Star Wars" secondary="*Darth Vader's breath*"/>
            </ListItem>
         </Link>
         <Divider variant="inset" component="li" />
      </List>
   )
}

export default chat