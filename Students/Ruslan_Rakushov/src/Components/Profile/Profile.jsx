import React from 'react';
import PropTypes from 'prop-types';
import { push } from "connected-react-router";
// UI
import {
  Card, CardContent, CardActions, Button, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, CircularProgress, 
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

//redux
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { setUserInfo } from '../../store/actions/userActions.js';

const useStyles = (() => ({
  root: {
    minWidth: 275,
    width: '550px',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  profileTable: {
    width: '300px',
    borderCollapse: 'collapse',
    '& tr:not(:last-child)': {
      borderBottom: '1px solid lightgrey',
    },
    '& td:first-child': {
      width: '100px',
      borderRight: '1px solid lightgrey',
    }
  },
  infoBtn: {
    width: '100%',
    padding: '5px 0',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  returnBtn: {
    width: '100%',
    padding: '5px 0',
    display: 'flex',
    justifyContent: 'center',
  },
  actions: {
    flexDirection: 'column',
  },
}));

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: 0,
      nameErr: false,
      ageErr: false,
      openDialog: false,
    };
  }
  handleSetUserInfoClick = () => {
    this.setState({
      openDialog: true,
    });
  }
  handleSetUserInfoCancel = () => {
    this.setState({
      openDialog: false,
    });
  }
  handleSetUserInfoSave = (id, name, age) => {
    if (!name || !age) {
      this.setState({
        nameErr: !name,
        ageErr: !age,
      });
      return;
    }
    this.props.setUserInfo(id, name, age, this.props.user.email, this.props.user.token);
    this.setState({
      openDialog: false,
    });
  }
  handleDelUserInfoClick = (id) => {
    this.setState({
      nameErr: false,
      ageErr: false,
    });
    this.props.setUserInfo(id, '', 0, this.props.user.email, this.props.user.token);
  }
  handleChange = (evt) => {
    if (evt.keyCode === 13) {
      this.handleSetUserInfoSave(this.props.user._id, this.state.name, this.state.age);
    } else {
      this.setState({ [evt.target.name]: evt.target.value });
      if (!!evt.target.value) {
        this.setState({
          [`${evt.target.name}Err`]: !evt.target.value
        });
      }
    }
  };

  render() {
    const { classes, user, isLoading, userSaveError, userSaveMessage } = this.props;
    return (
      <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="inherit" gutterBottom
          component='h1'>
            User Profile
          </Typography>
          <Typography variant="h5" component="h2">
            {user.name}
          </Typography>
          <table className= {classes.profileTable}>
            <tbody>
              <tr>
                <td>User name</td>
                <td>{ user.name }</td>
              </tr>
              <tr>
                <td>User e-mail</td>
                <td>{ user.email }</td>
              </tr>
              <tr>
                <td>User age</td>
                <td>{user.age ? user.age : '' }</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
          <CardActions
            disableSpacing
            className={classes.actions}>
          <div className={classes.infoBtn}>
          <Button size="small"
              variant='outlined'
              onClick={this.handleSetUserInfoClick}>
              Изменить
          </Button>
          <Button size="small"
              variant='outlined'
              onClick={() => this.handleDelUserInfoClick(this.props.user._id)}>
              Удалить
          </Button>
          </div>
          <div className={classes.returnBtn}>
          <Button size="small"
              variant='outlined'
              onClick={() => this.props.push(`/chat/${this.props.currentChatId}`)}>
              Вернуться к чатам...
          </Button>
          </div>
        </CardActions>
        </Card>
        {/* //FIX Убирать через n сек */}
        {userSaveError && <p className='error-message'>{userSaveError}</p>}
        {userSaveMessage && <p className='success-message'>{userSaveMessage}</p>}
        
        <Dialog
          open={this.state.openDialog || this.props.isLoading}
          onClose={this.handleSetUserInfoCancel}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Введите информацию о себе:</DialogTitle>
          <DialogContent>
            {isLoading ? (
              <div className='loading-circle'>
                <CircularProgress />
              </div>
            ) : <>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  name="name"
                  label="Имя пользователя"
                  type="text"
                  fullWidth
                  required
                  error={this.state.nameErr}
                  value={this.state.name}
                  onChange={this.handleChange}
                  onKeyUp={this.handleChange}
                />
                <TextField
                  margin="dense"
                  id="age"
                  name="age"
                  label="Ваш возраст"
                  required
                  error={this.state.ageErr}
                  type="number"
                  value={this.state.age}
                  onChange={this.handleChange}
                  onKeyUp={this.handleChange}
                />
                </>
            }
          </DialogContent>
        <DialogActions>
          <Button onClick={this.handleSetUserInfoCancel} color="primary">
            Отмена
          </Button>
          <Button onClick={() => this.handleSetUserInfoSave(this.props.user._id, this.state.name, this.state.age)}
            color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  userSaveError: PropTypes.string,
  userSaveMessage: PropTypes.string,

  push: PropTypes.func,
  setUserInfo: PropTypes.func,
}

const mapStateToProps = ({ userReducers }) => ({
  user: userReducers.user,
  isLoading: userReducers.isLoading,
  userSaveError: userReducers.userSaveError,
  userSaveMessage: userReducers.userSaveMessage,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  setUserInfo,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Profile));
