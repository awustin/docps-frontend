import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserLogIn from './services/usersService';
import LoginPage from './login/loginPage';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.userLogIn = this.userLogIn.bind(this);
  }

  state = {
    loggedIn: false,
    usr: undefined,
    error: undefined,
  };
  /*
  componentDidUpdate(prevProps, prevState) {
    const { usr, error } = this.state;
    if (prevState.usr !== usr
      && usr !== undefined
      && Object.entries(error).length === 0
    ) {
      this.setState({ loggedIn: true });
    }
  } */

  userLogIn(params) {
    UserLogIn(params)
      .then((response) => {
        const { usr, error } = this.state;
        let authUser;

        if(response.data != undefined) {
          authUser = response.data.data.usuario
          if (usr !== authUser
            && authUser !== undefined
            && error !== undefined
          ) {
            this.setState({ loggedIn: true, usr: authUser, error: undefined })
          }
        }
        else {
          this.setState({ error: response.message })
        }
      })
  }

  userLogOut() {
    this.setState({ usr: undefined, error: undefined, loggedIn: false });
  }

  render() {
    const { loggedIn, error } = this.state
    return (
      <Router>
        {
        (loggedIn) ? (
          <div>Welcome! Not supported yet. </div>
        )
          : (
            <Route
              path="/"
              render={() => (
                <LoginPage
                  logIn={this.userLogIn}
                  errorCode={error}
                />
              )}              
            />
          )
      }
      </Router>
    );
  }
}

export default hot(module)(App);
