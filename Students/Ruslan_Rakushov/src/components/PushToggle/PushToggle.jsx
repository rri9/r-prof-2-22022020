import React from 'react';
import './PushToggle.css';
import { IconButton } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsIconNone from '@material-ui/icons/NotificationsNone';

export default class PushToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false,
    };
  }
  handleToggle = () => {
    this.setState({
      toggled: !this.state.toggled,
    });
  }

  render() {
    return (
      <IconButton
        aria-label='notifications'
        color='inherit'
        className='push'
        onClick={this.handleToggle}
      >
        {this.state.toggled ?
          (<NotificationsIcon
            className='push-icon'
          />) 
          :
          (<NotificationsIconNone
            className='push-icon'
          />)
        }
      </IconButton>
    )
   }
}

      // <div className="push">
      //   <img className="push__image" src="./assets/PushToggle/notifications_none-24px.svg" alt="Push Notification"/>
      // </div>