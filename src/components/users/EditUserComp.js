import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import UserDetailsComp from './UserDetailsComp';
import userService from '../../services/userService';

class EditUserComp  extends Component {

  constructor(props)
  {
    super(props);
    this.state = { 
      user :this.props.usersState.selectedUser, 
      error:''
    };

    if (!this.props.usersState.selectedUser.id )
    {
      this.props.history.push('/users');
    }
  }

  async componentDidUpdate() {
    if (this.props.usersState.selectedUser.id != this.state.user.id)
    {
      this.setState({user:this.props.usersState.selectedUser});
    }
  }

  save = async (currUser) => {
    await this.setState({user : currUser});
    if (this.isValid())
    {
      this.props.dispatch({
        type : "UPDATE_USER",
        payload : this.state.user
      });
  
      userService.editUser(this.state.user);
  
      this.props.history.push('/users');
    }
    else
    {
      this.setState({error: "** All fields are required"});
    }
  }

  isValid = () =>
  {
    return (this.state.user.firstName && 
            this.state.user.lastName &&
            this.state.user.userName &&
            this.state.user.sessionTimeOut);
  }

  render() {
    let errItm = this.state.error ? <Grid item xs={12}><span style={{color:"red"}}>{this.state.error}</span></Grid> : '';
    if (!this.props.usersState.selectedUser.id )
    {
      return(<div></div>);
    }
    else
    {
      return (
        <div>
          <Grid container spacing={1}>
              <Grid item xs={10}>
                <h3>Edit User : {this.state.user.firstName} {this.state.user.lastName}</h3>
              </Grid>
              <Grid item xs={2}>
                <IconButton aria-label="cancel" onClick={() => this.props.history.push('/users')} >
                  <CloseIcon/>
                </IconButton>
              </Grid>
              {errItm}
              <Grid item xs={12}>
                <UserDetailsComp user={this.state.user} callback={ (user) => { this.save(user)}}/>
              </Grid>
            </Grid> 
        </div>
      );
    }
  }
}

const mapStateToProps = (state) =>
{
  return {
    usersState : state.users
  }
}

export default withRouter(connect(mapStateToProps)(EditUserComp));
