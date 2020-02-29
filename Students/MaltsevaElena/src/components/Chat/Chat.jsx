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
      color: theme.palette.common.white
   },
   item: {
      '&:hover, &:active': {
         backgroundColor: theme.palette.primary.main,
      },
      '.Mui-selected': {
         backgroundColor: theme.palette.primary.main,
      }
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
         <ListItem button className={classes.item}>
            <ListItemAvatar>
               <Badge color="secondary" overlap="circle" variant="dot">
                  <Avatar className={classes.avatar}>DV</Avatar>
               </Badge>
            </ListItemAvatar>
            <ListItemText primary="Darth Vader" secondary="Luke, I'm your father!" />
         </ListItem>
         <Divider variant="inset" component="li" />
         <ListItem button selected className={classes.item}>
            <ListItemAvatar>
               <Avatar className={classes.avatar}>H</Avatar>
            </ListItemAvatar>
            <ListItemText primary="HelpDesk" secondary="We'll call you back!" />
         </ListItem>
         <Divider variant="inset" component="li" />
         <ListItem button className={classes.item}>
            <ListItemAvatar>
            <Avatar className={classes.avatar}>SW</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Star Wars" secondary="*Darth Vader's breath*"/>
         </ListItem>
         <Divider variant="inset" component="li" />
      </List>
   )
}

export default chat