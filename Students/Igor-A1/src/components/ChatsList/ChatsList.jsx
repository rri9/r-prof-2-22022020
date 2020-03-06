import React from 'react'
import ReactDom from 'react-dom'
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
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.main,
      padding: 0
   },
   item: {
      '&:hover, &:active': {
         backgroundColor: theme.palette.hovered,
         color: theme.palette.common.white,
      },
      '.Mui-selected': {
         backgroundColor: theme.palette.selected,
         color: theme.palette.common.white,
      }
   },
   selected: {
      backgroundColor: theme.palette.selected,
   },
   avatar: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main
   }
}))

export default function ChatsList() {
   const classes = useStyles()

   return (
    <div className="chats-list">
    
      <List className={classes.root}>
      
         <ListItem button className={classes.item}>
            <ListItemAvatar>
               <Badge color="secondary" overlap="circle" variant="dot">
                  <Avatar className={classes.avatar}>DV</Avatar>
               </Badge>
            </ListItemAvatar>
            <ListItemText primary="Darth Vader" />
         </ListItem>
         
         <Divider variant="middle" component="li" />
         
         <ListItem button className={classes.item}>
            <ListItemAvatar>
               <Avatar className={classes.avatar}>G1</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Geek1" />
         </ListItem>
         
         <Divider variant="middle" component="li" />
         
         <ListItem button className={classes.item}>
            <ListItemAvatar>
            <Avatar className={classes.avatar}>G2</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Geek2"/>
         </ListItem>
         
         <Divider variant="middle" component="li" />
         
      </List>
      
    </div>
   )
}
