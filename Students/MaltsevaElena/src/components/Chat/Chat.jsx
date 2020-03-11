import React from 'react'
import ReactDom from 'react-dom'

import { Link } from 'react-router-dom'

// Styles, UI
import { ListItem, 
         ListItemAvatar, 
         ListItemText, 
         Avatar } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
   root: {
      '& .MuiListItem-root:hover': {
         backgroundColor: theme.palette.primary.light,
      },
      '& .Mui-selected': {
         backgroundColor: theme.palette.primary.main,
         color: theme.palette.secondary.main,
         '& .MuiListItemAvatar-root > .MuiAvatar-root': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common.white
         }
      },
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
      <Link to={ link } className={ classes.root }>
         <ListItem selected={ isSelected ? true : false } divider={ true } >
            <ListItemAvatar>
               <Avatar className={ classes.avatar }> { title[0].toUpperCase() } </Avatar>
            </ListItemAvatar>
            <ListItemText primary={ title } secondary={ message } />
         </ListItem>
      </Link>
   )
}

export default chat