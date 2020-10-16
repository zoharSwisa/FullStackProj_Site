import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import moviesService from '../../services/moviesService';
import enums from '../../enums';
import '../../App.css';

class MovieRowComp  extends Component {

  constructor(props)
  {
    super(props);
    this.state = {error: ''};
  }

  edit = () => {
    this.props.dispatch({
      type : "CHOOSE_MOVIE",
      payload : this.props.movie.id
    });

    this.props.history.push('/movies/editMovie/' + this.props.movie.id);
  }
  

  delete = async () => {
    let res = await moviesService.deleteMovie(this.props.movie.id);

    if (!res.data || !res.data.isSuccessful)
    {
      this.setState({error: res.data.err});
    }
    else
    {
      this.props.dispatch({
        type : "DELETE_MOVIE",
        payload : this.props.movie.id
      });
    }
  }

  render() {
    let movie = this.props.movie;

    let deleteButtonItem = this.props.usersState.connectedUser.permissions.includes(enums.Permissions.DELETE_MOVIES) ? (
        <IconButton aria-label="delete" onClick={this.delete} style={{color:"red"}}>
          <DeleteIcon />
        </IconButton>) : '';

    let updateButtonItem = this.props.usersState.connectedUser.permissions.includes(enums.Permissions.UPDATE_MOVIES) ? (
      <IconButton aria-label="edit" onClick={this.edit} >
        <EditIcon />
      </IconButton>) : '';

    let errItm = this.state.error ? <Typography variant="error" component="p"><span style={{color:"red"}}>{this.state.error}</span></Typography> : '';

    let subscriptionsItem = movie.subscriptionsWatch?.map(s => {
      let watchedDate = new Date(s.watchedDate);
      let watchedDateStr = watchedDate.getDate() + "/" + (watchedDate.getMonth() + 1) + "/" + watchedDate.getUTCFullYear();
    return (<li key={s.id}><Link to={`/subscriptions/${s.id}`} >{s.name}</Link>, {watchedDateStr}</li>);
    });

    
    return (
      <div style={{marginBottom: "10px"}}>
          <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {movie.name} 
                </Typography>
                <Typography variant="body2" component="div">
                    genres: {movie.genres?.join(', ')} <br />

                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                      <img src={movie.image} style={{maxWidth: "100%"}}/>
                      </Grid>
                      <Grid item xs={10}>
                        <h3>Subscriptions watched</h3>
                        <ul>
                          {subscriptionsItem}
                        </ul>
                      </Grid>
                    </Grid>
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

export default withRouter(connect(mapStateToProps)(MovieRowComp));
