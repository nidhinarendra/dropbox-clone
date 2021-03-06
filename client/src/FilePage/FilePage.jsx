import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App/index.css';
import { userActions, alertActions } from '../_actions';
import { userService } from '../_services';
import image1 from '../dropbox.jpg';
import { history } from '../_helpers';
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from 'reactstrap';

import { Button, Modal } from 'react-bootstrap';

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
            files: response
          });
        });
      }
    });
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

  constructor() {
    super();
    this.state = {
      userid: 0,
      dropdownOpen: false,
      files: [],
      folders: [],
      inputs: [],
      folderName: '',
      showModal: false,
      fileNameToShare: '',
      folderNameToShare: ''
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleFolderChange = this.handleFolderChange.bind(this);
    this.handleFolderSubmit = this.handleFolderSubmit.bind(this);
    this.openFile = this.openFile.bind(this);
    this.openFolder = this.openFolder.bind(this);
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({
      showModal: false,
      fileNameToShare: '',
      folderNameToShare: ''
    });
  }

  openFile(item) {
    console.log(item);
    this.setState({
      showModal: true,
      fileNameToShare: item.filename
    });
  }

  openFolder(item) {
    console.log(item);
    this.setState({
      showModal: true,
      folderNameToShare: item.foldername
    });
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
    userService.getFolders(user.id).then(response => {
      this.setState({
        folders: response
      });
    });
  }

  handleFolderChange(e) {
    const { value } = e.target;
    this.setState({ folderName: value });
  }

  handleFolderSubmit(e) {
    const { dispatch } = this.props;
    const { userid, folderName, inputs } = this.state;
    console.log(this.state.folderName);
    var payload = {
      userid: userid,
      folderName: folderName
    };
    console.log('payload in the handleFolderSubmit function', payload);

    userService.uploadFolder(payload).then(status => {
      if (status === 204) {
        dispatch(alertActions.success('Folder uploaded'));
        setTimeout(function() {
          dispatch(alertActions.clear());
        }, 2000);
        console.log('folder upload success');
        userService.getFolders(userid).then(response => {
          console.log('data coming from the server', response);
          this.setState({
            folders: response,
            inputs: []
          });
        });
      }
    });
  }

  appendInput() {
    this.setState({ inputs: this.state.inputs.concat(['']) });
  }

  personalInfo() {
    const { user } = this.props;
    this.props.dispatch(userActions.getPersonalData(user));
  }

  deleteFolder(item) {
    console.log('the item to delete is', item);
    const newState = this.state.folders;
    if (newState.indexOf(item) > -1) {
      newState.splice(newState.indexOf(item), 1);
      this.setState({ folders: newState });
    }
    const { userid, folders } = this.state;

    userService.deleteFolder(userid, item).then(response => {
      console.log('data coming from the server', response);
      this.setState({
        folders: response
      });
    });
  }

  deleteFile(item) {
    console.log('the item to delete is', item, this.state.files.indexOf(item));
    console.log(this.state.files);
    const newState = this.state.files;
    if (newState.indexOf(item) > -1) {
      newState.splice(newState.indexOf(item), 1);
      this.setState({ files: newState });
    }
    const { userid, files } = this.state;

    userService.deleteFile(userid, item).then(response => {
      console.log('data coming from the server', response);
      this.setState({
        files: response
      });
    });
  }

  getStarFile(item) {
    console.log('starring the item', item);
    console.log('the star status now is ', item.star);
    const newFiles = this.state.files;
    var index = newFiles.indexOf(item);
    // console.log(index);
    // console.log(!this.state.files[index].star);
    newFiles[index].star = !this.state.files[index].star;
    this.setState({
      files: newFiles
    });
    console.log(typeof !this.state.files[index].star, this.state.files);
    const { userid, files } = this.state;
    userService
      .updateStarFile(
        userid,
        this.state.files[index].filename,
        this.state.files[index].star
      )
      .then(response => {
        console.log('data coming from the server', response);
        this.setState({
          files: newFiles
        });
      });
  }

  getStarFolder(item) {
    console.log('starring the item', item);
    console.log('the star status now is ', item.star);
    const newFolders = this.state.folders;
    var index = newFolders.indexOf(item);
    console.log(index);
    console.log(!this.state.folders[index].star);
    newFolders[index].star = !this.state.folders[index].star;
    this.setState({
      folders: newFolders
    });

    const { userid, folders } = this.state;
    userService
      .updateStarFolder(
        userid,
        this.state.folders[index].foldername,
        this.state.folders[index].star
      )
      .then(response => {
        this.setState({
          folders: newFolders
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
              <div className="col-xs-2">
                <div className="page-header-title">
                  <h4 className="page-header-heading">FILES </h4>
                </div>
              </div>
              <div className="col-xs-2 col-md-2 col-md-push-6 search-bar">
                <input
                  className="form-control"
                  type="text"
                  placeholder="search"
                />
              </div>

              <div className="col-xs-2 col-md-push-6">
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
                    <div>
                      <hr />
                    </div>
                    <Link to="/activity">Activity </Link>
                    <div>
                      <hr />
                    </div>
                    <a onClick={this.handleLogout}>Logout</a>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>

          <div className="col-sm-7">
            <div>
              <table className="table table-striped">
                <tbody>
                  {this.state.inputs.map(function(input, i) {
                    const { folderName } = this.state;
                    return (
                      <tr key={i}>
                        <td>
                          <span className="glyphicon glyphicon-folder-close" />{' '}
                          <input
                            value={folderName}
                            name="folderName"
                            type="text"
                            onChange={this.handleFolderChange}
                          />
                          <button
                            className="btn btn-primary pull-right"
                            onClick={this.handleFolderSubmit}
                          >
                            {' '}
                            Save{' '}
                          </button>
                        </td>
                        <td />
                      </tr>
                    );
                  }, this)}

                  {this.state.folders.map(function(listValues, i) {
                    return (
                      <tr key={i}>
                        <td>
                          <span className="glyphicon glyphicon-folder-close" />{' '}
                          <a href="#">
                            {' '}
                            {listValues.foldername} {'   '}
                          </a>
                          {listValues.star == false ? (
                            <a
                              onClick={this.getStarFolder.bind(
                                this,
                                listValues
                              )}
                            >
                              {' '}
                              <span className="glyphicon glyphicon-star-empty" />{' '}
                            </a>
                          ) : (
                            <a
                              onClick={this.getStarFolder.bind(
                                this,
                                listValues
                              )}
                            >
                              {' '}
                              <span className="glyphicon glyphicon-star" />{' '}
                            </a>
                          )}
                          <Button
                            className="btn btn-info pull-right"
                            onClick={this.openFolder.bind(this, listValues)}
                          >
                            Share
                          </Button>
                          <button
                            className="btn btn-danger pull-right"
                            onClick={this.deleteFolder.bind(this, listValues)}
                            item={listValues}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  }, this)}

                  {this.state.files.map(function(listValues, i) {
                    return (
                      <tr key={i}>
                        <td>
                          <span className="glyphicon glyphicon-file" />{' '}
                          {listValues.filename}{' '}
                          {listValues.star == false ? (
                            <a
                              onClick={this.getStarFile.bind(this, listValues)}
                            >
                              {' '}
                              <span className="glyphicon glyphicon-star-empty" />{' '}
                            </a>
                          ) : (
                            <a
                              onClick={this.getStarFile.bind(this, listValues)}
                            >
                              {' '}
                              <span className="glyphicon glyphicon-star" />{' '}
                            </a>
                          )}
                          <Button
                            className="btn btn-info pull-right"
                            onClick={this.openFile.bind(this, listValues)}
                          >
                            Share
                          </Button>
                          <button
                            className="btn btn-danger pull-right"
                            onClick={this.deleteFile.bind(this, listValues)}
                            item={listValues}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  }, this)}
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
                  New Files
                </label>
              </li>
              <li>
                <a onClick={() => this.appendInput()} href="#">
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
        <Modal
          className="modal-background fade out"
          show={this.state.showModal}
          onHide={this.close}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {this.state.fileNameToShare}
              {this.state.folderNameToShare}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Email ID or Name to share with <br />
            <input id="modalBody" />
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.close}>Share</button>
            <button onClick={this.close}>Close</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication, files, folders } = state;
  const { user } = authentication;
  return {
    user,
    users,
    files,
    folders
  };
}

const connectedFilePage = connect(mapStateToProps)(FilePage);
export { connectedFilePage as FilePage };
