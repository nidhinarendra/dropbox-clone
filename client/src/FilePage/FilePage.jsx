import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App/index.css';
import { userActions, alertActions } from '../_actions';
import { userService } from '../_services';
import image1 from '../dropbox.jpg';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { history } from '../_helpers';

class FilePage extends Component {
  handleFileUpload(event) {
    const { dispatch } = this.props;
    const { userid } = this.state;
    const payload = new FormData();

    payload.append('myfile', event.target.files[0]);
    payload.append('user', userid);

    userService.uploadFile(payload).then(status => {
      if (status === 204) {
        dispatch(alertActions.success('File uploaded'));
        setTimeout(function() {
          dispatch(alertActions.clear());
        }, 2000);
        console.log('file upload success');
        userService.getFiles(userid).then(response => {
          console.log('data coming from the server', response);
          this.setState({
            userid: user.id,
            files: response
          });
        });
      }
    });
  }

  constructor() {
    super();
    this.state = {
      userid: 0,
      files: []
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    console.log('logout called');
    const { dispatch } = this.props;
    dispatch(userActions.logout());
  }

  handleHome() {
    history.push('/home');
  }

  handleFiles() {
    history.push('/files');
  }

  componentDidMount() {
    const { user } = this.props;
    this.setState({
      userid: user.id
    });
    userService.getFiles(user.id).then(response => {
      this.setState({
        files: response
      });
    });
  }

  newFolder() {
    var folderName = prompt('Enter a folder name you want to share', 'Folder');
    if (folderName != null) {
      //demo should be replaced with the position where the file goes
      document.getElementById('demo').innerHTML =
        'Hello ' + folderName + '! How are you today?';
    }
  }

  personalInfo() {
    const { user } = this.props;
    this.props.dispatch(userActions.getPersonalData(user));
  }

  render() {
    const { user } = this.props;
    return (
      <div className="container-fluid">
        <div className="row content">
          <div className="col-sm-2 sidenav">
            <p className="dropbox-image">
              <img
                src="https://cfl.dropboxstatic.com/static/images/index/rebrand/logos/glyphs/glyph_blue.svg"
                width="32px"
                height="32px"
              />
            </p>
            <ul className="nav nav-pills nav-stacked">
              <li className="nav-bar-left-contents">
                <a onClick={this.handleHome}>Home</a>
              </li>
              <li className="nav-bar-left-contents">
                <a onClick={this.handleHome}>Files</a>
              </li>
            </ul>
          </div>

          <div className="col-sm-10 page-header">
            <div className="row">
              <div className="col-xs-2">
                <div className="page-header-title">
                  <h4 className="page-header-heading"> HOME </h4>
                </div>
              </div>
              <div className="col-xs-2 col-md-2 col-md-push-6 search-bar">
                <input
                  className="form-control"
                  type="text"
                  placeholder="search"
                />
              </div>
              <div className="col-xs-2 col-md-2 search-bar">
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={this.handleLogout}
                >
                  Logout
                </button>
              </div>
              <div className="col-xs-2 col-md-push-4">
                <img src="https://cfl.dropboxstatic.com/static/images/avatar/faceholder-32-vflKWtuU5.png" />
              </div>
            </div>
          </div>

          <div className="col-sm-3">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="profile" onClick={this.personalInfo}>
                  <span className="glyphicon glyphicon-user" /> Account
                </a>
              </li>
              <li>
                <label className="btn btn-bs-file btn-primary">
                  <input
                    type="file"
                    encType="multipart/form-data"
                    onChange={this.handleFileUpload}
                    name="myfile"
                  />
                  New Files
                </label>
              </li>
              <li>
                <a onClick={this.newFolder} href="#">
                  <span className="glyphicon glyphicon-plus-sign" /> New Folder
                </a>
              </li>
              <li>
                <a onClick={this.newFolder} href="#">
                  <span className="glyphicon glyphicon-plus-sign" /> New Shared
                  Folder
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication, files } = state;
  const { user } = authentication;
  return {
    user,
    users,
    files
  };
}

const connectedFilePage = connect(mapStateToProps)(FilePage);
export { connectedFilePage as FilePage };