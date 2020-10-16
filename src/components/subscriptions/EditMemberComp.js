import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import subscriptionsService from '../../services/subscriptionsService';
import MovieDetailsComp from './MemberDetailsComp';

class EditMemberComp  extends Component {

  constructor(props)
  {
    super(props);
    this.state = { 
      subscription : this.props.subscriptionsState.selectedSubscription, 
      error:''
    }

    if (!this.props.subscriptionsState.selectedSubscription.id )
    {
      this.props.history.push('/subscriptions');
    }
  }

  async componentDidUpdate() {
    if (this.props.subscriptionsState.selectedSubscription.id != this.state.subscription.id)
    {
      this.setState({subscription:this.props.subscriptionsState.selectedSubscription});
    }
  }

  save = async (currMember) => {
    await this.setState({subscription : currMember});
    if(this.isValid())
    {
      this.props.dispatch({
        type : "UPDATE_SUBSCRIPTION",
        payload : this.state.subscription
      });
  
      subscriptionsService.editMember(this.state.subscription);
  
      this.props.history.push('/subscriptions')
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
    if (!this.props.subscriptionsState.selectedSubscription.id )
    {
      return(<div></div>);
    }
    else
    {
      return (
        <div>
          <Grid container spacing={1}>
              <Grid item xs={10}>
                <h3>Edit Subscription : {this.state.subscription.name}</h3>
              </Grid>
              <Grid item xs={2}>
                <IconButton aria-label="cancel" onClick={() => this.props.history.push('/subscriptions')} >
                  <CloseIcon/>
                </IconButton>
              </Grid>
              {errItm}
              <Grid item xs={12}>
                <MovieDetailsComp subscription={this.state.subscription} callback={  (member) => { this.save(member)}}/>
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
    subscriptionsState : state.subscriptions
  }
}

export default withRouter(connect(mapStateToProps)(EditMemberComp));
