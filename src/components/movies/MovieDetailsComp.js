import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

class MovieDetailsComp  extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      movieId : this.props.movie.id,
      name : this.props.movie.name,
      genres : this.props.movie.genres?.join(","),
      image : this.props.movie.image,
      premiered : new Date(this.props.movie.premiered)
    }
  }

  componentDidUpdate() {
    if (this.props.movie.id != this.state.movieId)
    {
      this.setState = {
        name : this.props.movie.name,
        genres : this.props.movie.genres?.join(","),
        image : this.props.movie.image,
        premiered : new Date(this.props.movie.premiered)
      }
    }
  }

  setName = (e) =>
  {
    this.setState({name: e.target.value});
  }

  setGenres = (e) =>
  {
    this.setState({genres: e.target.value});
  }

  setImage = (e) =>
  {
    this.setState({image: e.target.value});
  }

  setPremiered = (e) =>
  {
    this.setState({premiered: e});
  }

  save = () => {
    let m = {
      id : this.props.movie.id,
      name : this.state.name,
      genres : this.state.genres?.split(","),
      image : this.state.image,
      premiered : this.state.premiered.toISOString(),
      subscriptionsWatch: this.props.movie.subscriptionsWatch
    }

    this.props.callback(m);
  }

  render() {
    return (
      <div>
        <TextField id="name" label="Name" value={this.state.name} onChange={this.setName} required/> <br />
        <TextField id="genres" label="Genres" value={this.state.genres} onChange={this.setGenres} required/> <br />
        <TextField id="image" label="Image url" value={this.state.image} onChange={this.setImage} required/> <br />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>

        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="premiered"
          label="Premiered date"
          value={this.state.premiered}
          onChange={this.setPremiered}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>

        <IconButton aria-label="save" onClick={this.save} 
          style={{color:"green", bottom: "0", position: "fixed", right: "10px"}}>
          <SaveIcon style={{ fontSize: 50 }}/>
        </IconButton>
      </div>
    );
  }
}

export default MovieDetailsComp;
