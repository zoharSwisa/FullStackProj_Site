import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import MovieDetailsComp from './MovieDetailsComp';
import moviesService from '../../services/moviesService';

class AddMovieComp  extends Component {

  constructor(props)
  {
    super(props);
    this.state = { movie : {
      id : '',
      name : '',
      genres : [],
      image : '',
      premiered : new Date()
    }, error: ''}
  }

  save = async (currMovie) => {
    await this.setState({movie : currMovie});
    if (this.isValid())
    {
      let res = await moviesService.addMovie(this.state.movie);

      if (res.data && res.data.isSuccessful)
      {
        let movie = res.data.movie;
  
        this.props.dispatch({
          type : "ADD_MOVIE",
          payload : movie
        });
      }
      else{
        this.setState({error: res.data?.err});
      }
  
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

    return (
      <div>
        <Grid container spacing={1}>
            <Grid item xs={10}>
              <h3>Create Movie</h3>
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

export default withRouter(connect()(AddMovieComp));
