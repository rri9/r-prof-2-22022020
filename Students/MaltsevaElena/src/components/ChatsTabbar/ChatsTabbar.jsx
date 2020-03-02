import React from 'react'
import ReactDom from 'react-dom'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
// import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { ForumRounded, AccountCircleRounded, Settings } from '@material-ui/icons/'

const useStyles = makeStyles(theme => ({
  appBar: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none',
    borderTop: '1px solid',
    borderColor: theme.palette.primary.main
  },
  toolbar: {
    justifyContent: 'space-around'
  }
}))

let tabbar = () => {

  const classes = useStyles()

  return (
    <AppBar position="static" color="primary" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton color="secondary">
          <ForumRounded />
        </IconButton>
        <IconButton color="inherit">
          <AccountCircleRounded />
        </IconButton>
        <IconButton color="inherit">
          <Settings />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

// let tabbar = () => {
//   const classes = useStyles()
//   const [value, setValue] = React.useState(0)

//   return (
//     <BottomNavigation
//       value={value}
//       onChange={(event, newValue) => {
//         setValue(newValue);
//       }}
//       showLabels
//       className={classes.appBar}
//     >
//       <BottomNavigationAction label="Talks" icon={<ForumRounded />} />
//       <BottomNavigationAction label="Contacts" icon={<AccountCircleRounded />} />
//       <BottomNavigationAction label="Settings" icon={<Settings />} />
//     </BottomNavigation>
//   )
// }

export default tabbar

