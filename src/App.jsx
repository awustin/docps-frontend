import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.less';
import './App.css';
import AppLayout from './AppLayout';
import './AppLayout.css';
import './CustomStyles.css';
import GroupsMain from './groups/groupsMain';
import LoginPage from './login/loginPage';
import ProjectsMain from './projects/projectsMain';
import ReportsMain from './reports/reportsMain';
import { getGroupById } from './services/groupsService';
import { UserLogIn } from './services/usersService';
import TestplansMain from './testplans/testplansMain';
import UserMain from './user/userMain';
import WorkspaceMain from './workspace/workspaceMain';
import Logout from './logout/logout';
import UserVerification from './verification/userVerification';

class App extends Component {
  constructor(props) {
    super(props)
    this.userLogIn = this.userLogIn.bind(this)
    this.changeGroup = this.changeGroup.bind(this)
    this.userLogOut = this.userLogOut.bind(this)
  }

  state = {
    loggedIn: false,
    loggedUser: {
      id: undefined,
      name: undefined,
      currentGroup: {
        id: undefined,
        name: undefined,
        isGroupAdmin: undefined
      },
      isAdmin: undefined,
      memberOf: [],
      role: undefined
    },
    error: undefined,
    showLogout: false
  };

  userLogIn(params) {
    UserLogIn(params).then(({ data }) => {
      try {
        if (data.success && data.user) {
          const { loggedUser, error } = this.state
          const { user } = data
          if (loggedUser.id !== user.id && user.id && !error) {
            this.setState({ loggedIn: true, loggedUser: user, error: undefined })
          }
        }
        else {
          this.setState({ error: 'INVALID_USERNAME' });
        }
      }
      catch
      {
        this.setState({ error: 'NETWORK_ERROR' });
      }
    });
  }

  userLogOut() {
    this.setState({ loggedUser: { id: undefined }, error: undefined, loggedIn: false, showLogout: false });
  }

  changeGroup(value) {
    getGroupById(value).then((result) => {
      let { success, id, name } = result
      if (success) {
        this.setState({ loggedUser: { ...this.state.loggedUser, currentGroup: { id: id, name: name } } })
      }
    })
  }

  render() {
    const { loggedIn, loggedUser, error, showLogout } = this.state;
    return (
      <>
        <Router>
          {
            (loggedIn) ? (
              <div>
                <AppLayout user={loggedUser} logout={() => this.setState({ showLogout: true })}>
                  <Switch>
                    <Route path="/user" render={() => (
                      <UserMain user={loggedUser} />)}
                    />
                    <Route path="/groups" render={() => (
                      <GroupsMain user={loggedUser} />)}
                    />
                    <Route path="/projects" render={() => (
                      <ProjectsMain user={loggedUser} />)}
                    />
                    <Route path="/testplans" render={() => (
                      <TestplansMain user={loggedUser} />)}
                    />
                    <Route path="/workspace" render={() => (
                      <WorkspaceMain user={loggedUser} />)}
                    />
                    <Route path="/reports" render={() => (
                      <ReportsMain user={loggedUser} funcs={{ changeGroup: this.changeGroup }} />)}
                    />
                    <Route path="/login" render={() => (
                      <Redirect to="/user" />)}
                    />
                    <Route path="/home" render={() => (
                      <Redirect to="/user" />)}
                    />
                    <Route path="/verification/:code" render={() =>
                      <UserVerification />}
                    />
                    <Route exact path="/" render={() => (
                      <Redirect to="/user" />)}
                    />
                    <Route path="/" render={() => (
                      <div> Not found :( </div>)}
                    />
                  </Switch>
                </AppLayout>
              </div>
            ) : (
              <div>
                <Switch>
                  <Route path="/login" render={() => (
                    <LoginPage logIn={this.userLogIn} errorCode={error} />)}
                  />
                  <Route path="/verification/:code" render={() =>
                    <UserVerification />}
                  />
                  <Route path="/" render={() => (
                    <Redirect to="/login" />)}
                  />
                </Switch>
              </div>
            )
          }
        </Router>
        <Logout
          visible={showLogout}
          onConfirmation={this.userLogOut}
          onCancel={() => this.setState({ showLogout: false })}
        />
      </>
    );
  }
}

export default hot(module)(App);
