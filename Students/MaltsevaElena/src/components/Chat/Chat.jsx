import React from 'react'
import ReactDom from 'react-dom'

// Styles, UI
import { Box, 
         ListItem, ListItemAvatar, ListItemText, 
         Avatar } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
   root: {
      '& .MuiListItem-root:hover': {
         backgroundColor: theme.palette.primary.light,
         cursor: 'pointer'
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
   const { handleNavigate, link, title, message, isSelected } = props

   return (
      <Box className={ classes.root }>
         <ListItem divider={ true } 
            selected={ isSelected ? true : false } 
            onClick={ () => handleNavigate(link) } >
            <ListItemAvatar>
               <Avatar className={ classes.avatar }> { title[0].toUpperCase() } </Avatar>
            </ListItemAvatar>
            <ListItemText primary={ title } secondary={ message } />
         </ListItem>
      </Box>
   )
}

export default chat