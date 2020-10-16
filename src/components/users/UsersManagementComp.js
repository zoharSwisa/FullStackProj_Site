import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import AddUserComp from './AddUserComp';
import EditUserComp from './EditUserComp';
import AllUsersComp from './AllUsersComp';

class  UsersManagementComp extends Component {

  constructor(props)
  {
    super(props);
  }

  render() {
    return (
      <div>
          <Grid container spacing={5}>
            <Grid item xs={6}>
            <h3>Users</h3>
              <AllUsersComp />
            </Grid>
            <Grid item xs={6} style={{left:"10px"}}>
              <Switch>
                  <Route path="/users/editUser/" component={EditUserComp} />
                  <Route path="/users/addUser" component={AddUserComp} />
              </Switch>
            </Grid>
          </Grid> 
      </div>
    );
  }
}

export default withRouter(UsersManagementComp);