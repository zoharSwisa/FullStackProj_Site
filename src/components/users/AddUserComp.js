import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import UserDetailsComp from './UserDetailsComp';
import userService from '../../services/userService';

class AddUserComp  extends Component {

  constructor(props)
  {
    super(props);

    this.state = { user : {
      id : '',
      firstName : '',
      lastName : '',
      userName : '',
      createdDate : '',
      sessionTimeOut : '',
      permissions : []
    }, error: ''}
  }

  save = async (currUser) => {
    await this.setState({user : currUser});
    if(this.isValid())
    {
      let res = await userService.createUser(this.state.user);

      if (res.data && res.data.isSuccessful)
      {
        let usr = res.data.user;
  
        this.props.dispatch({
          type : "ADD_USER",
          payload : usr
        });
      }
      else{
        this.setState({error: res.data?.err});
      }
  
      this.props.history.push('/users')
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

    return (
      <div>
        <Grid container spacing={1}>
            <Grid item xs={10}>
              <h3>Create User</h3>
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

export default withRouter(connect()(AddUserComp));
