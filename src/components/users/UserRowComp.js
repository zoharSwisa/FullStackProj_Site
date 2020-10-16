import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import userService from '../../services/userService';
import enums from '../../enums';
import '../../App.css';

class UserRowComp extends Component {

  constructor(props) {
    super(props);
    this.state = { error: '' };
  }

  edit = () => {
    this.props.dispatch({
      type: "CHOOSE_USER",
      payload: this.props.user.id
    });

    this.props.history.push('/users/editUser/' + this.props.user.id)
  }


  delete = async () => {
    let res = await userService.deleteUser(this.props.user.id);

    if (!res.data || !res.data.isSuccessful) {
      this.setState({ error: res.data.err });
    }
    else {
      this.props.dispatch({
        type: "DELETE_USER",
        payload: this.props.user.id
      });
    }
  }

  render() {
    let user = this.props.user;
    let createdDate = new Date(user.createdDate);
    let createdDateStr = createdDate.getDate() + "/" + (createdDate.getMonth() + 1) + "/" + createdDate.getUTCFullYear();

    let deleteButtonItem = user.permissions.includes(enums.Permissions.ADMIN) ? '' : (
      <IconButton aria-label="delete" onClick={this.delete} style={{ color: "red" }}>
        <DeleteIcon />
      </IconButton>);

    let errItm = this.state.error ? <Typography variant="error" component="p"><span style={{ color: "red" }}>{this.state.error}</span></Typography> : '';
    return (
      <div style={{marginBottom: "10px"}}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body2" component="div">
              UserName: {user.userName} <br />
                    Session time out (Minutes): {user.sessionTimeOut} <br />
                    Created date: {createdDateStr} <br />
                    Permissions: {user.permissions.join(', ')} <br />
            </Typography>
            {errItm}
          </CardContent>
          <CardActions>
            <IconButton aria-label="edit" onClick={this.edit} >
              <EditIcon />
            </IconButton>
            {deleteButtonItem}
          </CardActions>
        </Card>
      </div>
    );
  }
}


export default withRouter(connect()(UserRowComp));
