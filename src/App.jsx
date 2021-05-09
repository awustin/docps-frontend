import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import UserLogIn from './services/usersService';
import LoginPage from './login/loginPage';
import AppLayout from './homepage/appLayout';
import 'antd/dist/antd.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.userLogIn = this.userLogIn.bind(this);
  }

  state = {
    loggedIn: true,
    usr: 223,
    error: undefined,
  };

  userLogIn(params) {
    UserLogIn(params)
      .then((response) => {
        const { usr, error } = this.state;
        let authUser;

        if (response.data !== undefined) {
          authUser = response.data.data.usuario;
          if (usr !== authUser
            && authUser !== undefined
            && error == undefined
          ) {
            this.setState({ loggedIn: true, usr: authUser, error: undefined })
          }
        } else {
          this.setState({ error: (response.message !== 'Network Error') ? response.message : 'NETWORK_ERROR' });
        }
      });
  }

  userLogOut() {
    this.setState({ usr: undefined, error: undefined, loggedIn: false });
  }

  render() {
    const { loggedIn, usr, error } = this.state;
    return (
      <Router>
        {
        (loggedIn) ? (
          <div>
          <Redirect to="/home" />
          <Route
            path="/home"
            render={() => (
              <AppLayout
                user={usr}
              />
            )}
          />
          </div>
        )
          : (
          <div>
          <Redirect to="/login" />
          <Route
            path="/login"
            render={() => (
              <LoginPage
                logIn={this.userLogIn}
                errorCode={error}
              />
            )}
          />
          </div>
        )
      }
      </Router>
    );
  }
}

export default hot(module)(App);
