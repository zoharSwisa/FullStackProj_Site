import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter} from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Pagination from '@material-ui/lab/Pagination';
import MemberRowComp from './MemberRowComp';
import subscriptionsService from '../../services/subscriptionsService';
import enums from '../../enums';

class AllMembersComp  extends Component {

  constructor(props)
  {
    super(props);
    this.state = {pageNum:1};
  }

  async componentDidMount() {
    if (!this.props.subscriptionsState.subscriptions || this.props.subscriptionsState.subscriptions.length == 0)
    {
      let res = await subscriptionsService.getAllSubscriptions();
      let subs = res.data;
  
      this.props.dispatch({
        type : "INIT_ALL_SUBSCRIPTIONS",
        payload : subs
      });
    }

    if (this.props.memberId != 0)
    {
      this.props.dispatch({
        type : "INIT_FILTERED_MOVIES",
        payload : this.props.subscriptionsState.subscriptions.filter(m => m.id == this.props.memberId)
      });
    }
    else
    {
      this.props.dispatch({
        type : "INIT_FILTERED_MOVIES",
        payload : this.props.subscriptionsState.subscriptions
      });
    }
  }

  setPageNum = (e) => 
  {
    this.setState({pageNum: parseInt(e.target.innerText)})
  }

  render() {
    let paginatorCount = Math.ceil(this.props.subscriptionsState.fileredSubscriptions.length / 5);
    let startMemberIndex = (this.state.pageNum - 1) * 5;
    let allSubs = this.props.subscriptionsState.fileredSubscriptions.slice(startMemberIndex, startMemberIndex + 5);
    let subsItem = allSubs?.map(m => {
      return <MemberRowComp subscription={m} key={m.id} />
    });

    let addButton = this.props.usersState.connectedUser.permissions.includes(enums.Permissions.CREATE_SUBSCRIPTIONS) ?
      (<IconButton aria-label="add" onClick={() => this.props.history.push('/subscriptions/addSubscription')} 
        style={{color:"green", bottom: "0", position: "fixed", right: "51%"}}>
        <AddCircleIcon style={{ fontSize: 50 }}/>
      </IconButton>) : ''

    return (
      <div>
        {subsItem}
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
    subscriptionsState : state.subscriptions,
    usersState: state.users
  }
}

export default withRouter(connect(mapStateToProps)(AllMembersComp));
