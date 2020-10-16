import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import enums from '../../enums';
import subscriptionsService from '../../services/subscriptionsService';

class MoviesWatchedComp  extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      movies:this.props.movies,
      newDate: new Date(),
      newMovieId: '',
      newMovieName:'', 
      error:''
    }
  }

  setNewDate = (e) => 
  {
    this.setState({newDate: e});
  }

  setNewMovieId = (e) =>
  {
    if (e.target.innerText)
    {
      let mId = e.target.getElementsByTagName("span")[0].innerText;
      this.setState({newMovieId :mId, newMovieName :e.target.innerText});
    }
    else
    {
      this.setState({newMovieId :'', newMovieName :''});
    }
  }

  addSubscription = async () => 
  {
    if (this.isValid())
    {
      let subscription = {
        "memberId": this.props.member.id,
        "movie": {
          "movieId": this.state.newMovieId,
          "date": this.state.newDate
        }
      }
      let res = await subscriptionsService.addSubscription(subscription);
      if(res.data && res.data.isSuccessful)
      {
        let m = this.state.movies;
        m.push({
          "id": this.state.newMovieId,
          "name":this.state.newMovieName,
          "date":this.state.newDate.toISOString()
        });
        this.setState({movies: m});

        this.props.dispatch({
          type : "ADD_MOVIE_SUBSCRIPTIONS",
          payload : {
            movieId: this.state.newMovieId,
            subscription: {
              watchedDate: this.state.newDate.toISOString(),
              name:this.props.member.name,
              id: this.props.member.id
            }
          }
        });
      }

      this.setState({newMovieId:''})
    }
    else
    {
      this.setState({error: "Select a movie"});
    }
  }

  isValid = () =>
  {
    return (this.state.newMovieId && 
            this.state.newMovieName);
  }

  render() {
    let moviesItem = this.state.movies?.map(m => {
      let watchedDate = new Date(m.date);
      let watchedDateStr = watchedDate.getDate() + "/" + (watchedDate.getMonth() + 1) + "/" + watchedDate.getUTCFullYear();
    return (<li key={m.id}><Link to={`/movies/${m.id}`} >{m.name}</Link>, {watchedDateStr}</li>);
    });

    let errItm = this.state.error ? <Grid item xs={12}><span style={{color:"red"}}>{this.state.error}</span></Grid> : '';
    let addMovieItems= this.props.usersState.connectedUser.permissions.includes(enums.Permissions.UPDATE_SUBSCRIPTIONS) ?
      (
        <Grid container spacing={3}>
          <Grid item xs={5}>
            <Autocomplete
              id="moviesName"
              value={this.state.newMovieId}
              options={this.props.moviesState.movies?.filter(m => m.name && !this.props.movies?.map(wm => wm.name).includes(m.name))}
              getOptionLabel={(option) => option.name}
              onChange={this.setNewMovieId}
              renderInput={(params) => <TextField {...params} label="Movie Name" margin="normal" />}
              renderOption={(option) => (
                <React.Fragment>
                  <span id="movieId" style={{display:"none"}}>{option.id}</span>
                  {option.name}
                </React.Fragment>
              )}
            />
          </Grid>
          <Grid item xs={5}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date"
                label="Date"
                value={this.state.newDate}
                onChange={this.setNewDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={2}>
            <IconButton aria-label="add" onClick={this.addSubscription} 
              style={{color:"green", marginTop:"20px"}}>
              <AddCircleIcon />
            </IconButton>
          </Grid>
          {errItm}
        </Grid>
      ) : ''
    return (
      <div>
          <h4>Movies Watched</h4>
          <ul>
            {moviesItem}
          </ul>
          <h4>Subscripe to new movie</h4>
          {addMovieItems}
      </div>
    );
  }
}

const mapStateToProps = (state) =>
{
  return {
    moviesState : state.movies,
    usersState: state.users
  }
}

export default withRouter(connect(mapStateToProps)(MoviesWatchedComp));
