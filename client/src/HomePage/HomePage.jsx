import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App/index.css';
import { userActions } from '../_actions';
import image1 from '../dropbox.jpg';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

class HomePage extends React.Component {
  handleFileUpload(event) {
    const payload = new FormData();

    payload.append('myfile', event.target.files[0]);

    this.props.dispatch(userActions.uploadFile(payload));
  }
  constructor() {
    super();
    this.state = {
      files: []
    };
  }
  componentDidMount() {
    const { user } = this.props;
    this.props.dispatch(userActions.getFiles(user));
    // API.getFiles().then(data => {
    //   console.log(data);
    //   this.setState({
    //     files: data
    //   });
    // });
  }

  newFolder() {
    var folderName = prompt('Enter a folder name', 'Folder');
    if (folderName != null) {
      //demo should be replaced with the position where the file goes
      document.getElementById('demo').innerHTML =
        'Hello ' + folderName + '! How are you today?';
    }
  }

  customFileInput() {
    delete field.input.value; // <-- just delete the value property
    return <input type="file" id="file" {...field.input} />;
  }

  render() {
    const { user } = this.props;
    return (
      <div className="container-fluid">
        <div className="row content">
          <div className="col-sm-2 sidenav">
            <h4>
              <img src={image1} />
              Dropbox{user.fn}!!!
            </h4>
            <ul className="nav nav-pills nav-stacked">
              <li className="active">
                <a href="#section1">Home</a>
              </li>
              <li>
                <a href="#section2">Files</a>
              </li>
            </ul>
          </div>
          <div className="col-sm-8">
            <h3>HOME</h3>
            <br />
            <div>
              <h4>Starred</h4>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td>
                      <span className="glyphicon glyphicon-file" /> Starred
                      file1
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {' '}
                      <span className="glyphicon glyphicon-file" /> Starred
                      file3
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="glyphicon glyphicon-folder-close" />{' '}
                      Starred folder1
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h4>Added Files</h4>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td>Added file1</td>
                  </tr>
                  <tr>
                    <td>Added file2</td>
                  </tr>
                  <tr>
                    <td>Added file3</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-sm-2 sidenav">
            <ul className="nav navbar-nav navbar-left">
              <li>
                <a href="#">
                  <span className="glyphicon glyphicon-user" /> Personal
                </a>
              </li>
              <li>
                <a onClick={this.newFile}>
                  <span className="glyphicon glyphicon-plus-sign" /> New Files
                </a>
                <input
                  type="file"
                  id="my_file"
                  name="myfile"
                  onChange={this.handleFileUpload}
                />
              </li>
              <li>
                <a href="#">
                  <span className="glyphicon glyphicon-plus-sign" /> New Folder
                </a>
              </li>
              <li>
                <a href="#">
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
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
