import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter} from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';
import MovieRowComp from './MovieRowComp';
import moviesService from '../../services/moviesService';
import enums from '../../enums';

class AllMoviesComp  extends Component {

  constructor(props)
  {
    super(props);
    this.state = {filter:'', pageNum:1};
  }

  async componentDidMount() {
    if (!this.props.moviesState.movies || this.props.moviesState.movies.length == 0)
    {
      let res = await moviesService.getAllMovies();
      let movies = res.data.movies;
  
      this.props.dispatch({
        type : "INIT_ALL_MOVIES",
        payload : movies
      });
    }

    if (this.props.movieId != 0)
    {
      this.props.dispatch({
        type : "INIT_FILTERED_MOVIES",
        payload : this.props.moviesState.movies.filter(m => m.id == this.props.movieId)
      });
    }
    else
    {
      this.props.dispatch({
        type : "INIT_FILTERED_MOVIES",
        payload : this.props.moviesState.movies
      });
    }
  }

  setFilter = (e) =>
  {
    this.setState({filter:e.target.value});
  }

  setPageNum = (e) => 
  {
    this.setState({pageNum: parseInt(e.target.innerText)})
  }

  filterMovies = () => 
  {
    let filter = this.props.moviesState.movies.filter(m => m.name?.toLowerCase().includes(this.state.filter.toLowerCase()));
    this.props.dispatch({
      type : "INIT_FILTERED_MOVIES",
      payload : filter
    });

    this.setState({filter:''});
  }

  render() {
    let paginatorCount = Math.ceil(this.props.moviesState.fileredMovies.length / 5);
    let startMovieIndex = (this.state.pageNum - 1) * 5;
    let allMovies = this.props.moviesState.fileredMovies.slice(startMovieIndex, startMovieIndex + 5);
    let moviesItem = allMovies.filter(m => m.name).map(m => {
      return <MovieRowComp movie={m} key={m.id} />
    });

    let addButton = this.props.usersState.connectedUser.permissions.includes(enums.Permissions.CREATE_MOVIES) ?
      (<IconButton aria-label="add" onClick={() => this.props.history.push('/movies/addMovie')} 
        style={{color:"green", bottom: "0", position: "fixed", right: "51%"}}>
        <AddCircleIcon style={{ fontSize: 50 }}/>
      </IconButton>) : '';

    return (
      <div>
        <TextField id="searchMovie" value={this.state.filter} label="Search Movie" onChange={this.setFilter}/>
        <IconButton aria-label="add" onClick={this.filterMovies}>
          <SearchIcon style={{ fontSize: 30 }}/>
        </IconButton>
        <br/><br/>
        {moviesItem}
        {addButton}
        <br/>
        <Pagination count={paginatorCount} value={this.state.pageNum} onChange={this.setPageNum} />
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

export default withRouter(connect(mapStateToProps)(AllMoviesComp));
