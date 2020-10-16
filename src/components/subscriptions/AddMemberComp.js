import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import MemberDetailsComp from './MemberDetailsComp';
import subscriptionsService from '../../services/subscriptionsService';

class AddMemberComp  extends Component {

  constructor(props)
  {
    super(props);
    this.state = { subscription : {
      id : '',
      name : '',
      email : '',
      movies: [],
      city : ''
    }, error: ''}
  }

  save = async (currMember) => {
    await this.setState({subscription : currMember});
    if (this.isValid())
    {
      let res = await subscriptionsService.addMember(this.state.subscription);

      if (res.data && res.data.isSuccessful)
      {
  
        let subscription = res.data.member;
        subscription.movies = []
  
        this.props.dispatch({
          type : "ADD_SUBSCRIPTION",
          payload : subscription
        });
      }
      else{
        this.setState({error: res.data?.err});
      }
  
      this.props.history.push('/subscriptions');
    }
    else
    {
      this.setState({error: "** All fields are required"});
    }
  }

  isValid = () =>
  {
    return (this.state.subscription.name && 
            this.state.subscription.email &&
            this.state.subscription.city);
  }

  render() {
    let errItm = this.state.error ? <Grid item xs={12}><span style={{color:"red"}}>{this.state.error}</span></Grid> : '';

    return (
      <div>
        <Grid container spacing={1}>
            <Grid item xs={10}>
              <h3>Create Subscription</h3>
            </Grid>
            <Grid item xs={2}>
              <IconButton aria-label="cancel" onClick={() => this.props.history.push('/subscriptions')} >
                <CloseIcon/>
              </IconButton>
            </Grid>
            {errItm}
            <Grid item xs={12}>
              <MemberDetailsComp subscription={this.state.subscription} callback={ (member) => { this.save(member)}}/>
            </Grid>
          </Grid> 
      </div>
    );
  }
}

export default withRouter(connect()(AddMemberComp));
