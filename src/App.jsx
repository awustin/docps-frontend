import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { UserLogIn } from './services/users.js';
import LoginPage from './login/loginPage';
import './App.css';

class App extends Component {
  state = {
    loggedIn: false,
    usr: {},
    error: {}
  }; 

  componentDidUpdate(prevProps, prevState) {
    const { usr, error } = this.state;
    if (prevState.usr !== usr
      && usr !== undefined
      //&& Object.entries(usr).length !== 0
      && Object.entries(error).length === 0
      //&& usr.data.data.length !== 0
      ) {
      this.setState({ loggedIn: true });
    }
  }

  userLogIn(params) {
    UserLogIn(params)
      .then(response => this.setState({ usr: response.data.data.usuario }))
      .catch(error => this.setState({ error: error }));
  }

  userLogOut() {
    this.setState({ usr: {}, error: {}, loggedIn: false })
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <Router>
        {
        (loggedIn) ? (
          <div>Welcome! Not supported yet. </div>
        )
          : (
            <Route
              path="/"
              render={() => 
              <LoginPage 
                logIn = {this.userLogIn.bind(this)}
              />}
            />
          )
      }
      </Router>
    );
  }
}

export default hot(module)(App);
