import { hot } from 'react-hot-loader';
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import LoginPage from './login/loginPage';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      userInfo: {},
      error: {}
    }
  }

  render(){
    return(
      <Router>
      {
        (this.state.loggedIn) ? (
          <div>Not supported yet. </div>
        )
        :
        (
          <Route path="/" render={() => {
            return <LoginPage />
          }} />  
        )
      }    
      </Router>
    )
  }

}


export default hot(module)(App);
