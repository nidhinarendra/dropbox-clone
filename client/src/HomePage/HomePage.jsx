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
    const { dispatch } = this.props;
    const { userid } = this.state;
    console.log('entered handleFileUpload' + userid);
    const payload = new FormData();

    payload.append('myfile', event.target.files[0]);

    //payload.append('userid', userid);
    console.log('the payload type is: ' + typeof payload);
    for (var pair of payload.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    this.props.dispatch(userActions.uploadFile(payload));
  }

  constructor() {
    super();
    this.state = {
      userid: 0,
      files: []
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    this.setState({
      userid: user.id
    });
    console.log('this props is: ' + this.props.user.id);
    this.props.dispatch(userActions.getFiles(user));
    // API.getFiles().then(data => {
    //   console.log(data);
    //   this.setState({
    //     files: data
    //   });
    // });
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
            <h4>
              <img src={image1} />
              Dropbox
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
                      <span className="glyphicon glyphicon-file" />
                      flight_tickets.pdf
                      <span className="glyphicon glyphicon-star pull-right" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {' '}
                      <span className="glyphicon glyphicon-file" />{' '}
                      exam_dates_timings.docx
                      <span className="glyphicon glyphicon-star pull-right" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="glyphicon glyphicon-folder-close" />{' '}
                      Subjects
                      <span className="glyphicon glyphicon-star pull-right" />
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
                    <td>
                      <span className="glyphicon glyphicon-file" />sample_file.txt
                      <span className="glyphicon glyphicon-star-empty pull-right" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="glyphicon glyphicon-file" />
                      Assignment2.txt{' '}
                      <span className="glyphicon glyphicon-star-empty pull-right" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="glyphicon glyphicon-folder-close" />
                      travel_itenary{' '}
                      <span className="glyphicon glyphicon-star-empty pull-right" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-sm-2 sidenav">
            <ul className="nav navbar-nav navbar-left">
              <li>
                <a href="profile" onClick={this.personalInfo}>
                  <span className="glyphicon glyphicon-user" /> Account
                </a>
              </li>
              <li>
                <label
                  className="btn btn-bs-file btn-primary"
                  onChange={this.handleFileUpload}
                >
                  <input type="file" encType='multipart/form-data' name="myfile" />
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
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
