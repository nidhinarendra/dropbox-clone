import React from 'react';
import { Redirect } from 'react-router';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './index.css';
import './styles/Dashboard.css';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { FilePage } from '../FilePage';
import { RegisterPage } from '../RegisterPage';
import { PersonalData } from '../PersonalData';

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;

    return (
      <div>
        {alert.message && (
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        )}
        <Router history={history}>
          <div>
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute exact path="/home" component={HomePage} />
            <PrivateRoute exact path="/files" component={FilePage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
