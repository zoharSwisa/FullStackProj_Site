import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';

class MemberDetailsComp  extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      subscriptionId : this.props.subscription.id,
      name : this.props.subscription.name,
      email : this.props.subscription.email,
      city : this.props.subscription.city
    }
  }

  componentDidUpdate()
  {
    if (this.props.subscription.id != this.state.subscriptionId)
    {
      this.setState = {
        name : this.props.subscription.name,
        email : this.props.subscription.email,
        city : this.props.subscription.city
      }
    }
  }

  setName = (e) =>
  {
    this.setState({name: e.target.value});
  }

  setEmail = (e) =>
  {
    this.setState({email: e.target.value});
  }

  setCity = (e) =>
  {
    this.setState({city: e.target.value});
  }

  save = () => {
    let m = {
      id : this.props.subscription.id,
      name : this.state.name,
      email : this.state.email,
      city : this.state.city,
      movies: this.props.subscription.movies
    }

    this.props.callback(m);
  }

  render() {
    return (
      <div>
        <TextField id="name" label="Name" value={this.state.name} onChange={this.setName} required/> <br />
        <TextField id="email" label="Email" value={this.state.email} onChange={this.setEmail} required/> <br />
        <TextField id="city" label="City" value={this.state.city} onChange={this.setCity} required/> <br />

        <IconButton aria-label="save" onClick={this.save} 
          style={{color:"green", bottom: "0", position: "fixed", right: "10px"}}>
          <SaveIcon style={{ fontSize: 50 }}/>
        </IconButton>
      </div>
    );
  }
}

export default MemberDetailsComp;
