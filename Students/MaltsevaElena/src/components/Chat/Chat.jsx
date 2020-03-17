import React from 'react'
import ReactDom from 'react-dom'

// Styles, UI
import { Box, 
         ListItem, ListItemAvatar, ListItemIcon, ListItemText, 
         Avatar,
         IconButton,
         Menu, MenuItem } from '@material-ui/core'
import MoreIcon from '@material-ui/icons/MoreHoriz'
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles, withStyles } from '@material-ui/core/styles'

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

const StyledMenu = withStyles({
   paper: {
     border: '1px solid #2C2C6A',
   },
 })(props => (
   <Menu
     elevation={5}
     getContentAnchorEl={null}
     anchorOrigin={{
       vertical: 'top',
       horizontal: 'right',
     }}
     transformOrigin={{
       vertical: 'top',
       horizontal: 'right',
     }}
     {...props}
   />
 ))
 
 const StyledMenuItem = withStyles(theme => ({
   root: {
     '&:hover': {
       backgroundColor: theme.palette.primary.light
     },
   },
 }))(MenuItem)

let chat = (props) => {

   const classes = useStyles()
   const { handleNavigate, chatRoomId, title, message, isSelected, deleteChat } = props

   const [ anchorEl, setAnchorEl ] = React.useState(null)

   const handleClick = event => {
      setAnchorEl(event.currentTarget)
   }

   const handleClose = () => {
      setAnchorEl(null)
   }

   return (
      <Box className={ classes.root }>
         <ListItem divider={ true } 
            selected={ isSelected ? true : false } 
            onClick={ () => handleNavigate(`/chat/${chatRoomId}`) } >
            <ListItemAvatar>
               <Avatar className={ classes.avatar }> { title[0].toUpperCase() } </Avatar>
            </ListItemAvatar>
            <ListItemText primary={ title } secondary={ message } />

            {/* Chat's actions */}
            { isSelected && 
               <IconButton onClick={ handleClick } aria-label="display more actions" aria-haspopup="true" edge="end">
                  <MoreIcon />
               </IconButton>
            }
            <StyledMenu
               anchorEl={ anchorEl }
               open={ Boolean(anchorEl) }
               onClose={ handleClose } >
               <StyledMenuItem>
                  <ListItemIcon>
                     <NotificationsOffIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Mute" />
               </StyledMenuItem>
               <StyledMenuItem onClick={ () => deleteChat(chatRoomId) }>
                  <ListItemIcon>
                     <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Delete" />
               </StyledMenuItem>
            </StyledMenu>

         </ListItem>
      </Box>
   )
}

export default chat