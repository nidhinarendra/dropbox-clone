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
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from 'reactstrap';

class PersonalData extends Component {
  constructor() {
    super();
    this.state = {
      dropdownOpen: false,
      userid: 0,
      files: []
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleLogout() {
    event.preventDefault();
    console.log('logout called');
    const { dispatch } = this.props;
    dispatch(
      userActions.logout().then(res => {
        window.location.reload();
      })
    );
  }

  handleHome() {
    history.push('/home');
  }

  handleFiles() {
    history.push('/files');
  }

  handleDropdown() {
    document.getElementById('myDropdown').classList.toggle('show');
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
    console.log(user);
    const options = ['one', 'two', 'three'];
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
                <a onClick={this.handleFiles}>Files</a>
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
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle
                    tag="span"
                    onClick={this.toggle}
                    data-toggle="dropdown"
                    aria-expanded={this.state.dropdownOpen}
                  >
                    <img src="https://cfl.dropboxstatic.com/static/images/avatar/faceholder-32-vflKWtuU5.png" />
                  </DropdownToggle>
                  <DropdownMenu right className="dropdownmenu">
                    <br />
                    <DropdownItem header>
                      <img src="https://cfl.dropboxstatic.com/static/images/avatar/faceholder-32-vflKWtuU5.png" />
                      <br /> <br />
                      <div className="username">
                        {user.firstName} {user.lastName}
                      </div>
                    </DropdownItem>

                    <div onClick={this.personalInfo}>Personal</div>

                    <br />
                    <div onClick={this.toggle}>Custom dropdown item</div>
                    <div>
                      <hr />
                    </div>
                    <div onClick={this.toggle}>Custom dropdown item</div>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>

          <div className="col-sm-7">
            <div>
              <h4>Starred</h4>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td>
                      <span className="glyphicon glyphicon-file" />{' '}
                      flight_tickets.pdf{' '}
                      <span className="glyphicon glyphicon-star" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {' '}
                      <span className="glyphicon glyphicon-file" />{' '}
                      exam_dates_timings.docx{' '}
                      <span className="glyphicon glyphicon-star" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="glyphicon glyphicon-folder-close" />{' '}
                      Subjects <span className="glyphicon glyphicon-star" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h4>Recently Added Files</h4>
              <table className="table table-striped">
                <tbody>
                  {this.state.files.map(function(listValues, i) {
                    return (
                      <tr key={i}>
                        <td>
                          <span className="glyphicon glyphicon-folder-close" />{' '}
                          {listValues.filename} {'   '}
                          <span className="glyphicon glyphicon-star-empty" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-sm-3">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <label className="btn btn-bs-file btn-primary">
                  <input
                    type="file"
                    encType="multipart/form-data"
                    onChange={this.handleFileUpload}
                    name="myfile"
                  />
                  Upload Files
                </label>
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

const connectedPersonalData = connect(mapStateToProps)(PersonalData);
export { connectedPersonalData as PersonalData };
