import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import userService from '../../services/userService';


class LoginComp  extends Component {

  constructor(props)
  {
    super(props);
    this.state = {userName: '', password:'', error: ''};
  }

  setUserName = (e) => {
    this.setState({userName: e.target.value});
  }

  setPassword = (e) => {
    this.setState({password: e.target.value});
  }

  login = async () => {
    if(this.isValid())
    {
      let res = await userService.login(this.state.userName, this.state.password);
      let result = res.data;
      if (result && result.isSuccessful)
      {
        this.props.dispatch({
          type : "LOGIN_USER",
          payload : result.user
        });
  
        localStorage.setItem('connectedUser', result.user.id);
        setTimeout(this.logout, result.user.sessionTimeOut * 60000);
        
        this.props.history.push('/');
      }
      else 
      {
        // Show Error msg
        this.setState({error: result?.err});
      }
    }
    else
    {
      // Show Error msg
      this.setState({error: "Enter UserName / Password"});
    }
  }

  logout = () =>
  {
    this.props.dispatch({
      type : "LOG_OUT",
      payload : {} 
    });
    localStorage.removeItem('connectedUser');
  }

  isValid = () =>
  {
    return (this.state.userName && this.state.password);
  }

  render() {
    let errItm = this.state.error ? <Grid item xs={12}><span style={{color:"red"}}>{this.state.error}</span></Grid> : '';

    return (
      <div>
        <h3>Login</h3>
         <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField id="userName" label="UserName" onChange={this.setUserName}/>
          </Grid>
          <Grid item xs={12}>
            <TextField id="password" label="Password" onChange={this.setPassword}/>
          </Grid>
          {errItm}
          <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={this.login}>
            Login
          </Button>
          </Grid>
          <Grid item xs={12}>
            New User ?: 
            <Link to="/signin">Create Acount</Link>
          </Grid>
        </Grid> 
      </div>
    );
  }
}

export default withRouter(connect()(LoginComp));
