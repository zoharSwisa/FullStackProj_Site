import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import AddMemberComp from './AddMemberComp';
import AllMembersComp from './AllMembersComp';
import EditMemberComp from './EditMemberComp';
import enums from '../../enums';

class SubscriptionsComp extends Component {

  constructor(props)
  {
    super(props);
    this.state = {memberId:0}
  }

  static getDerivedStateFromProps(props)
  {
    return {memberId : (props.match.params.id ? props.match.params.id : 0)}
  }

  render() {
    let editMovieRoute = (this.props.usersState.connectedUser.permissions.includes(enums.Permissions.UPDATE_SUBSCRIPTIONS)) ?
    (<Route path="/subscriptions/editSubscription" component={EditMemberComp} />) : '';

    let addMovieRoute = (this.props.usersState.connectedUser.permissions.includes(enums.Permissions.CREATE_SUBSCRIPTIONS)) ?
    (<Route path="/subscriptions/addSubscription" component={AddMemberComp} />) : '';

    return (
      <div>
        <Grid container spacing={5}>
            <Grid item xs={6}>
            <h3>Subscriptions</h3>
              <AllMembersComp memberId={this.state.memberId}/>
            </Grid>
            <Grid item xs={6} style={{left:"10px"}}>
              <Switch>
                  {editMovieRoute}
                  {addMovieRoute}
              </Switch>
            </Grid>
          </Grid> 
      </div>
    );
  }
}

const mapStateToProps = (state) =>
{
  return {
    usersState : state.users
  }
}

export default withRouter(connect(mapStateToProps)(SubscriptionsComp));