import React from 'react'
import ReactDom from 'react-dom'
import {Link} from 'react-router-dom'

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
      width: '100%',
      height: 'calc(100vh - 145px)',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.common.white
   },
   item: {
      '&:hover, &:active': {
         backgroundColor: theme.palette.primary.main,
      },
   },
   selected: {
      backgroundColor: theme.palette.primary.main,
   },
   avatar: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main
   }
}))

let chat = () => {
   const classes = useStyles()

   return (
      <List className={classes.root}>
         <Link to="/chat/1">
            <ListItem button className={classes.item}>
               <ListItemAvatar>
                  <Badge color="secondary" overlap="circle" variant="dot">
                     <Avatar className={classes.avatar}>Sup</Avatar>
                  </Badge>
               </ListItemAvatar>
               <ListItemText primary="Support" secondary="Describe the problem" />
            </ListItem>
         </Link>
         <Divider variant="inset" component="li" />

         <Link to="/chat/2">
            <ListItem button selected className={classes.item}>
               <ListItemAvatar>
                  <Avatar className={classes.avatar}>DV</Avatar>
               </ListItemAvatar>
               <ListItemText primary="Darth Vader" secondary="Luke, I'm your father!" />
            </ListItem>
         </Link>
         <Divider variant="inset" component="li" />
         
         <Link to="/chat/3">
            <ListItem button className={classes.item}>
               <ListItemAvatar>
               <Avatar className={classes.avatar}>L</Avatar>
               </ListItemAvatar>
               <ListItemText primary="Lenta" secondary="News"/>
            </ListItem>
         </Link>
         <Divider variant="inset" component="li" />
      </List>
   )
}

export default chat