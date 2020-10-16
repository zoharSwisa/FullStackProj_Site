import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import LoginComp from './users/LoginComp';
import UsersManagementComp from './users/UsersManagementComp';
import MoviesComp from './movies/MoviesComp';
import SubscriptionsComp from './subscriptions/SubscriptionsComp';
import SigninComp from './users/SigninComp';
import moviesService from '../services/moviesService';
import userService from '../services/userService';
import enums from '../enums';
import '../App.css';


class MainComp extends Component {

  constructor(props)
  {
    super(props);
  }

  async componentDidMount() {
    if (!this.props.usersState.users || this.props.usersState.users.length == 0)
    {
      let res = await userService.getAllUsers();
      let users = res.data.users;

      this.props.dispatch({
        type : "INIT_ALL_USERS",
        payload : users
      });
    }
    if (!this.props.moviesState.movies || this.props.moviesState.movies.length == 0)
    {
      moviesService.getAllMovies().then((res) => {
        let movies = res.data.movies;
  
        this.props.dispatch({
          type : "INIT_ALL_MOVIES",
          payload : movies
        });
      });
    }

    // Init Connected user
    if (localStorage.getItem('connectedUser'))
    {
      let connectedUser = this.props.usersState.users.find(u => u.id == localStorage.getItem('connectedUser'));

      this.props.dispatch({
        type : "LOGIN_USER",
        payload : connectedUser
      });
    }
  }

  logout = () => {
    this.props.dispatch({
      type : "LOG_OUT",
      payload : {} 
    });

    localStorage.removeItem('connectedUser');

    this.props.history.push('/');
  }

  render() {
    let connectedUser = this.props.usersState.connectedUser;

    if (connectedUser && connectedUser.id) {
      let moviesButton = (connectedUser.permissions.includes(enums.Permissions.VIEW_MOVIES)) ?
      (<Button color="primary" variant={this.props.location.pathname.includes('movies') ? 'contained' : 'outlined'} onClick={() => this.props.history.push('/movies')}>
        Movies
      </Button>) : '';

    let subscriptionsButton = (connectedUser.permissions.includes(enums.Permissions.VIEW_SUBSCRIPTIONS) ) ?
      (<Button color="primary" variant={this.props.location.pathname.includes('subscriptions') ? 'contained' : 'outlined'} onClick={() => this.props.history.push('/subscriptions')}>
        Subscriptions
      </Button>) : '';

    let usersButton = (connectedUser.permissions.includes(enums.Permissions.ADMIN)) ?
      (<Button color="primary" variant={this.props.location.pathname.includes('users') ? 'contained' : 'outlined'} onClick={() => this.props.history.push('/users')}>
        Users Management
      </Button>) : '';

    let moviesByIdRoute = (connectedUser.permissions.includes(enums.Permissions.VIEW_MOVIES)) ?
    (<Route path="/movies/:id" component={MoviesComp} />) : '';

    let moviesRoute = (connectedUser.permissions.includes(enums.Permissions.VIEW_MOVIES)) ?
    (<Route path="/movies" component={MoviesComp} />) : '';

    let subscriptionByIdRoute = (connectedUser.permissions.includes(enums.Permissions.VIEW_SUBSCRIPTIONS)) ?
    (<Route path="/subscriptions/:id" component={SubscriptionsComp} />) : '';

    let subscriptionsRoute = (connectedUser.permissions.includes(enums.Permissions.VIEW_SUBSCRIPTIONS)) ?
    (<Route path="/subscriptions" component={SubscriptionsComp} />) : '';

    let usersRoute = (connectedUser.permissions.includes(enums.Permissions.ADMIN)) ?
    (<Route path="/users" component={UsersManagementComp} />) : '';

      return (
        <div className="main">
            <h1>Movies - Subscriptions Web Site</h1>
            <h3>Hello {connectedUser.userName}</h3>

            {moviesButton}
            {subscriptionsButton}
            {usersButton}
            <Button color="primary" variant="outlined" onClick={this.logout}>
            Log Out
            </Button>
  
            <Switch>
              {moviesByIdRoute}
              {moviesRoute}
              {subscriptionByIdRoute}
              {subscriptionsRoute}
              {usersRoute}
            </Switch>
        </div>
     );
    }

    return (
      <div  className="main">
        <h1>Movies - Subscriptions Web Site</h1>

        <Switch>
          <Route path="/signin" component={SigninComp} />
          <Route path="/" component={LoginComp} />
        </Switch>
    </div>
    );
  }
}

const mapStateToProps = (state) =>
{
  return {
    usersState : state.users,
    moviesState: state.movies
  }
}

export default withRouter(connect(mapStateToProps)(MainComp));