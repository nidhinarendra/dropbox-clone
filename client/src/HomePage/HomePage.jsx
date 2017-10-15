import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App/index.css';
import { userActions } from '../_actions';
import image1 from '../dropbox.jpg';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(userActions.getAll());
  }

  newFile() {
    document.getElementById('my_file').click();
  }
  newFolder() {
    var folderName = prompt('Enter a folder name', 'Folder');
    if (folderName != null) {
      //demo should be replaced with the position where the file goes
      document.getElementById('demo').innerHTML =
        'Hello ' + person + '! How are you today?';
    }
  }
  render() {
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
                <input type="file" id="my_file" />
              </li>
              <li>
                <a onClick={this.newFolder} href="#">
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

        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">Modal Header</h4>
              </div>
              <div className="modal-body">
                <p>Some text in the modal.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
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
