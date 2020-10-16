import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import moviesService from '../../services/moviesService';
import MovieDetailsComp from './MovieDetailsComp';

class EditMovieComp  extends Component {

  constructor(props)
  {
    super(props);
    this.state = { movie : this.props.moviesState.selectedMovie, error:''}

    if (!this.props.moviesState.selectedMovie.id )
    {
      this.props.history.push('/movies');
    }
  }

  async componentDidUpdate() {
    if (this.props.moviesState.selectedMovie.id != this.state.movie.id)
    {
      this.setState({movie:this.props.moviesState.selectedMovie});
    }
  }

  save = async (cuuMovie) => {
    await this.setState({movie : cuuMovie});
    if (this.isValid())
    {
      this.props.dispatch({
        type : "UPDATE_MOVIE",
        payload : this.state.movie
      });
  
      moviesService.editMovie(this.state.movie);
  
      this.props.history.push('/movies')
    }
    else
    {
      this.setState({error: "** All fields are required"});
    }
  }

  isValid = () =>
  {
    return (this.state.movie.name && 
            this.state.movie.genres.join(',') &&
            this.state.movie.image);
  }

  render() {
    let errItm = this.state.error ? <Grid item xs={12}><span style={{color:"red"}}>{this.state.error}</span></Grid> : '';
    if (!this.props.moviesState.selectedMovie.id )
    {
      return(<div></div>);
    }
    else
    {
      return (
        <div>
          <Grid container spacing={1}>
              <Grid item xs={10}>
                <h3>Edit Movie : {this.state.movie.name}</h3>
              </Grid>
              <Grid item xs={2}>
                <IconButton aria-label="cancel" onClick={() => this.props.history.push('/movies')} >
                  <CloseIcon/>
                </IconButton>
              </Grid>
              {errItm}
              <Grid item xs={12}>
                <MovieDetailsComp movie={this.state.movie} callback={ (movie) => { this.save(movie)}}/>
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
    moviesState : state.movies
  }
}

export default withRouter(connect(mapStateToProps)(EditMovieComp));
