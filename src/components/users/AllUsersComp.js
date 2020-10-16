import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter} from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Pagination from '@material-ui/lab/Pagination';
import UserRowComp from './UserRowComp';
import userService from '../../services/userService';

class AllUserComp  extends Component {

  constructor(props)
  {
    super(props);
    this.state = {pageNum:1};
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
  }

  setPageNum = (e) => 
  {
    this.setState({pageNum: parseInt(e.target.innerText)})
  }

  render() {
    let paginatorCount = Math.ceil(this.props.usersState.users.length / 5);
    let startUserIndex = (this.state.pageNum - 1) * 5;
    let allUsers = this.props.usersState.users.slice(startUserIndex, startUserIndex + 5);
    let usersItem = allUsers.map(u => {
      return <UserRowComp user={u} key={u.id} />
    });

    return (
      <div>
        {usersItem}

        <IconButton aria-label="add" onClick={() => this.props.history.push('/users/addUser')} 
          style={{color:"green", bottom: "0", position: "fixed", right: "51%"}}>
          <AddCircleIcon style={{ fontSize: 50 }}/>
        </IconButton>
        <br/>
        <Pagination count={paginatorCount} value={this.state.pageNum} onChange={this.setPageNum} />
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

export default withRouter(connect(mapStateToProps)(AllUserComp));
