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
      userid: 0
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleDropdown() {
    document.getElementById('myDropdown').classList.toggle('show');
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
                <a onClick={this.handleFiles}>Files</a>
              </li>
            </ul>
          </div>

          <div className="col-sm-10 page-header">
            <div className="row">
              <div className="col-xs-4">
                <div className="page-header-title">
                  <h4 className="page-header-heading"> Personal Account </h4>
                </div>
              </div>
              <div className="col-xs-2 col-md-2 col-md-push-4 search-bar">
                <input
                  className="form-control"
                  type="text"
                  placeholder="search"
                />
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
                    <Link to="/account">Personal </Link>

                    <br />
                    <div onClick={this.toggle}>Custom dropdown item</div>
                    <div>
                      <hr />
                    </div>
                    <div className="col-xs-2 col-md-2">
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={this.handleLogout}
                      >
                        Sign out
                      </button>
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
