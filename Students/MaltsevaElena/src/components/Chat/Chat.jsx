import React from 'react'
import ReactDom from 'react-dom'

import { Link } from 'react-router-dom'

import { ListItem, 
         ListItemAvatar, 
         ListItemText, 
         Avatar, 
         Badge, 
         Divider } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
   item: {
      '&:hover, &:active': {
         backgroundColor: theme.palette.primary.light,
      },
   },
   selected: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      '&>.MuiListItemAvatar-root>.makeStyles-avatar-189': {
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
   const { link, title, message, isSelected } = props

   return (
      <Link to={ link }>
         <ListItem className={ isSelected ? classes.selected : classes.item }>
            <ListItemAvatar>
               <Avatar className={ classes.avatar }> { title[0] } </Avatar>
            </ListItemAvatar>
            <ListItemText primary={ title } secondary={ message } />
         </ListItem>
         <Divider light="true" />
      </Link>
   )
}

export default chat