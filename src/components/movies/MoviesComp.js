import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import AddMovieComp from './AddMovieComp';
import AllMoviesComp from './AllMoviesComp';
import EditMovieComp from './EditMovieComp';
import enums from '../../enums';

class MoviesComp extends Component {

  constructor(props)
  {
    super(props);
    this.state = {movieId:0}
  }

  static getDerivedStateFromProps(props)
  {
    return {movieId : (props.match.params.id ? props.match.params.id : 0)}
  }

  render() {
    let editMovieRoute = (this.props.usersState.connectedUser.permissions.includes(enums.Permissions.UPDATE_MOVIES)) ?
    (<Route path="/movies/editMovie" component={EditMovieComp} />) : '';

    let addMovieRoute = (this.props.usersState.connectedUser.permissions.includes(enums.Permissions.CREATE_MOVIES)) ?
    (<Route path="/movies/addMovie" component={AddMovieComp} />) : '';

    return (
      <div>
        <Grid container spacing={5}>
            <Grid item xs={6}>
            <h3>Movies</h3>
              <AllMoviesComp movieId={this.state.movieId} />
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

export default withRouter(connect(mapStateToProps)(MoviesComp));
