import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import subscriptionsService from '../../services/subscriptionsService';
import enums from '../../enums';
import MoviesWatchedComp from './MoviesWatchedComp';
import '../../App.css';

class MemberRowComp  extends Component {

  constructor(props)
  {
    super(props);
    this.state = {error: ''};
  }

  edit = () => {
    this.props.dispatch({
      type : "CHOOSE_SUBSCRIPTION",
      payload : this.props.subscription.id
    });

    this.props.history.push('/subscriptions/editSubscription/' + this.props.subscription.id);
  }

  delete = async () => {
    let res = await subscriptionsService.deleteMember(this.props.subscription.id);

    if (!res.data || !res.data.isSuccessful)
    {
      this.setState({error: res.data.err});
    }
    else
    {
      this.props.dispatch({
        type : "DELETE_SUBSCRIPTION",
        payload : this.props.subscription.id
      });
    }
  }

  render() {
    let sub = this.props.subscription;

    let deleteButtonItem = this.props.usersState.connectedUser.permissions.includes(enums.Permissions.DELETE_SUBSCRIPTIONS) ? (
        <IconButton aria-label="delete" onClick={this.delete} style={{color:"red"}}>
          <DeleteIcon />
        </IconButton>) : '';
    let updateButtonItem = this.props.usersState.connectedUser.permissions.includes(enums.Permissions.UPDATE_SUBSCRIPTIONS) ? (
      <IconButton aria-label="edit" onClick={this.edit} >
        <EditIcon />
      </IconButton>): '';

    let errItm = this.state.error ? <Typography variant="error" component="p"><span style={{color:"red"}}>{this.state.error}</span></Typography> : '';

    return (
      <div style={{marginBottom: "10px"}}>
          <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {sub.name} 
                </Typography>
                <Typography variant="body2" component="div">
                    Email: {sub.email} <br />
                    City: {sub.city} <br />
                    <MoviesWatchedComp movies={sub.movies} member={sub}/>
                </Typography>
                {errItm}
            </CardContent>
            <CardActions>
                {updateButtonItem}
                {deleteButtonItem}
            </CardActions>
          </Card>
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

export default withRouter(connect(mapStateToProps)(MemberRowComp));
