import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route,
} from 'react-router-dom';
import LoginPage from './login/loginPage';
import './App.css';
import request from './services/request.js'

class App extends Component {
  state = {
    loggedIn: false,
  }; 

  userLogIn(params) {
    return request.post('//localhost:3000/login',params)
      .then(response => this.setState({ loggedIn: true }))
      .catch(error => this.setState({ loggedIn: true }));
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <Router>
        {
        (loggedIn) ? (
          <div>Not supported yet. </div>
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
