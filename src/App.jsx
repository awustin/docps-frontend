import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import UserLogIn from './services/usersService';
import LoginPage from './login/loginPage';
import UserMain from './user/userMain';
import ProjectsMain from './projects/projectsMain';
import TestplansMain from './testplans/testplansMain';
import WorkspaceMain from './workspace/workspaceMain';
import ExecutionsMain from './executions/executionsMain';
import ReportsMain from './reports/reportsMain';
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
            && error === undefined
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
          <Switch>
            <Route path="/user" render={() => (
              <UserMain user={usr} /> )}
            />
            <Route path="/projects" render={() => (
              <ProjectsMain user={usr} /> )}
            />
            <Route path="/testplans" render={() => (
              <TestplansMain user={usr} /> )}
            />
            <Route path="/workspace" render={() => (
              <WorkspaceMain user={usr} /> )}
            />
            <Route path="/executions" render={() => (
              <ExecutionsMain user={usr} /> )}
            />
            <Route path="/reports" render={() => (
              <ReportsMain user={usr} /> )}
            />
            <Route path="/login" render={() => (
              <Redirect to="/user"/>)}
            />
            <Route exact path="/" render={() => (
              <Redirect to="/user"/>)}
            />
            <Route path="/" render={() => (
              <div> Not found :( </div>)}
            />
          </Switch>
          </div>
        ) : (
          <div>
            <Switch>
              <Route path="/login" render={() => (
                <LoginPage logIn={this.userLogIn} errorCode={error} />)}
              />
              <Route path="/" render={() => (
                <Redirect to="/login"/>)}
              />
            </Switch>
          </div>
        )
      }
      </Router>
    );
  }
}

export default hot(module)(App);
