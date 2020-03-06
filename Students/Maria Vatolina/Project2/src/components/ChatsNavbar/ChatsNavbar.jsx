import React from 'react'
import ReactDom from 'react-dom'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme => ({
   grow: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      boxShadow: 'none',
   },
   search: {
      position: 'relative',
      borderBottom: '1px solid rgba(255, 255, 255, .2)'
   },
   searchIcon: {
      width: theme.spacing(3),
      height: '100%',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center'
   },
   inputRoot: {
      color: 'inherit'
   },
   inputInput: {
      padding: theme.spacing(1, 1, 1, 5),
   }
}))

let navBar = () => {

   const classes = useStyles()

   return (
      <AppBar position="static" className={classes.grow}>
         <Toolbar className={classes.search}>
            <SearchIcon className={classes.searchIcon}/>
            <InputBase
            placeholder="Search in all..."
            classes={{
               root: classes.inputRoot,
               input: classes.inputInput
            }}
            inputProps={{ "aria-label": "search" }}
            />
         </Toolbar>
      </AppBar>
   )
}

export default navBar