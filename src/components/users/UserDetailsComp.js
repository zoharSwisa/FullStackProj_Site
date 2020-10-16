import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import enums from '../../enums';

class UserDetailsComp  extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      userId: this.props.user.id,
      firstName : this.props.user.firstName,
      lastName : this.props.user.lastName,
      userName : this.props.user.userName,
      sessionTimeOut : this.props.user.sessionTimeOut,
      permissions : this.props.user.permissions
    }

    this.permissions = [enums.Permissions.VIEW_SUBSCRIPTIONS, enums.Permissions.CREATE_SUBSCRIPTIONS, enums.Permissions.DELETE_SUBSCRIPTIONS, 
      enums.Permissions.UPDATE_SUBSCRIPTIONS, enums.Permissions.VIEW_MOVIES, enums.Permissions.CREATE_MOVIES, enums.Permissions.DELETE_MOVIES, 
      enums.Permissions.UPDATE_MOVIES];
  }

  componentDidUpdate() {
    if (this.props.user.id != this.state.userId)
    {
      this.setState = {
        firstName : this.props.user.firstName,
        lastName : this.props.user.lastName,
        userName : this.props.user.userName,
        sessionTimeOut : this.props.user.sessionTimeOut,
        permissions : this.props.user.permissions
      }
    }
  }

  setFirstName = (e) =>
  {
    this.setState({firstName: e.target.value});
  }

  setLastName = (e) =>
  {
    this.setState({lastName: e.target.value});
  }

  setUserName = (e) =>
  {
    this.setState({userName: e.target.value});
  }

  setSessionTimeOut = (e) =>
  {
    this.setState({sessionTimeOut: e.target.value});
  }

  setPermissions = (e) =>
  {
    let per = this.state.permissions;

    if (e.target.checked)
    {
      per.push(e.target.name);
    }
    else
    {
      per = per.filter(p => p != e.target.name);
    }

    this.setState({permissions : per});
  }

  save = () => {
    let u = {
      id : this.props.user.id,
      firstName : this.state.firstName,
      lastName : this.state.lastName,
      userName : this.state.userName,
      sessionTimeOut : this.state.sessionTimeOut,
      createdDate :this.props.user.createdDate,
      permissions : this.state.permissions
    }

    this.props.callback(u);
  }

  render() {
    let perItems = this.permissions.map((p, index) => 
    {
      if (this.state.permissions.includes(p))
      {
        return (<FormControlLabel
          control={
            <Checkbox
              defaultChecked
              onChange={this.setPermissions}
              name={p}
              color="primary"
              key={index}
            />
          }
          label={p}
          key={index}
        />);
      }
      return (<FormControlLabel
        control={
          <Checkbox
            onChange={this.setPermissions}
            name={p}
            color="primary"
            key={index}
          />
        }
        label={p}
        key={index}
      />);
    });

    let adminPerItem = this.state.permissions.includes(enums.Permissions.ADMIN) ? 
      (<FormControlLabel
        control={
          <Checkbox
            defaultChecked
            onChange={this.setPermissions}
            name="Admin"
            color="primary"
            disabled
          />
        }
        label="Admin"
      />) :
    (<FormControlLabel
      control={
        <Checkbox
          onChange={this.setPermissions}
          name="Admin"
          color="primary"
          disabled
        />
      }
      label="Admin"
    />);

    let createdDateItem = '';

    if (this.props.user.createdDate)
    {
      let createdDate = new Date(this.props.user.createdDate);
      let createdDateStr = createdDate.getDate() + "/" + (createdDate.getMonth() + 1) + "/" + createdDate.getUTCFullYear();
      createdDateItem = <TextField id="createdDate" label="Created date" value={createdDateStr} disabled/>;
    }

    return (
      <div>
        <TextField id="firstName" label="First Name" value={this.state.firstName} onChange={this.setFirstName} required/> <br />
        <TextField id="lastName" label="Last Name" value={this.state.lastName} onChange={this.setLastName} required/> <br />
        <TextField id="userName" label="User Name" value={this.state.userName} onChange={this.setUserName} required/> <br />
        <TextField id="sessionTimeOut" label="Session time out" value={this.state.sessionTimeOut} onChange={this.setSessionTimeOut} required/> <br />
        {createdDateItem} <br />
        Permissions : <br />
        <FormGroup>
        {perItems}
        {adminPerItem}
        </FormGroup>

        <IconButton aria-label="save" onClick={this.save} 
          style={{color:"green", bottom: "0", position: "fixed", right: "10px"}}>
          <SaveIcon style={{ fontSize: 50 }}/>
        </IconButton>
        
      </div>
    );
  }
}

export default UserDetailsComp;
