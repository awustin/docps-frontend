import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import ChangePassword from './account/changePassword';
import './App.css';
import './App.less';
import AppLayout from './AppLayout';
import './AppLayout.css';
import './CustomStyles.css';
import GroupsMain from './groups/groupsMain';
import Login from './login/login';
import Logout from './logout/logout';
import ProjectsMain from './projects/projectsMain';
import sessionReducer from './reducers/session';
import ReportsMain from './reports/reportsMain';
import { getGroupById } from './services/groupsService';
import { UserLogIn, UserLogOut } from './services/usersService';
import TestplansMain from './testplans/testplansMain';
import UserMain from './user/userMain';
import UserVerification from './verification/userVerification';
import WorkspaceMain from './workspace/workspaceMain';

let store = createStore(sessionReducer);

const checkOpenSession = () => {
  return !!localStorage.getItem('sessionId');
};

class App extends Component {
  constructor(props) {
    super(props)
    this.userLogIn = this.userLogIn.bind(this)
    this.changeGroup = this.changeGroup.bind(this)
    this.userLogOut = this.userLogOut.bind(this)
    this.setLoggedUserFromLocalStorage = this.setLoggedUserFromLocalStorage.bind(this)
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
    loading: false,
    error: undefined,
    showLogout: false
  };

  setLoggedUserFromLocalStorage() {
    let local = JSON.parse(localStorage.getItem('loggedUserLocal'));
    if (local)
      this.setState({ loggedUser: local });
  }

  componentDidMount() {
    this.setLoggedUserFromLocalStorage();
  }

  userLogIn(params) {
    this.setState({ loading: true, error: undefined });
    UserLogIn(params).then(({ data }) => {
      try {
        if (data.success && data.user) {
          const { loggedUser } = this.state;
          const { user, sessionId } = data;
          localStorage.setItem('loggedUserLocal', JSON.stringify(user));
          localStorage.setItem('sessionId', JSON.stringify(sessionId));
          if (loggedUser.id !== user.id && user.id) {
            this.setState({ loading: false, loggedIn: true, loggedUser: user, error: undefined })
          }
        }
        else
          this.setState({ loading: false, error: data.message });
      }
      catch {
        this.setState({ loading: false, error: 'NETWORK_ERROR' });
      }
    });
  }

  userLogOut() {
    let sessionId = localStorage.getItem('sessionId');
    UserLogOut(sessionId).then( result => {
      this.setState({ loggedUser: { id: undefined }, error: undefined, loggedIn: false, showLogout: false });
      localStorage.removeItem('loggedUserLocal');
      localStorage.removeItem('sessionId');
    });
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
    const { loggedUser, error, loading, showLogout } = this.state;
    return (
      <Provider store={store}>
        <Router>
          {
            (checkOpenSession() && loggedUser.id) ? (
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
                    <Route path="/account/changePassword" render={() =>
                      <ChangePassword
                        user={loggedUser}
                        userLogOut={this.userLogOut}
                      />}
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
                  <Route path="/login" render={() =>
                    <Login logIn={this.userLogIn} loading={loading} error={error} />}
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
      </Provider>
    );
  }
}

export default App;
