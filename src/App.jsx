import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { UserLogIn } from './services/usersService';
import { getGroupById } from './services/groupsService';
import LoginPage from './login/loginPage';
import UserMain from './user/userMain';
import GroupsMain from './groups/groupsMain';
import ProjectsMain from './projects/projectsMain';
import TestplansMain from './testplans/testplansMain';
import WorkspaceMain from './workspace/workspaceMain';
import ReportsMain from './reports/reportsMain';
import 'antd/dist/antd.css';
import './App.less';
import './CustomStyles.css';
import './AppLayout.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.userLogIn = this.userLogIn.bind(this)
		this.changeGroup = this.changeGroup.bind(this)
  }

  state = {
    loggedIn: false,
    loggedUser: {
			id: undefined,
			name: undefined,
			currentGroup: {
				id: undefined,
				name: undefined
			},
     isAdmin: undefined,
			memberOf: []
    },
    error: undefined,
  };

  userLogIn(params) {
		UserLogIn(params).then(({ data }) => {
			try
			{
				if (data.success && Object.prototype.hasOwnProperty.call(data,'user')) {				
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
    this.setState({ loggedUser: undefined, error: undefined, loggedIn: false });
  }
	
	changeGroup(value) {
		getGroupById(value).then( (result) => {
			let { success, id, name } = result
			if(success)
			{
				this.setState({ loggedUser:{...this.state.loggedUser, currentGroup:{ id: id, name: name } } })
			}
		})
	}

  render() {
    const { loggedIn, loggedUser, error } = this.state;
    return (
      <Router>
        {
        (loggedIn) ? (
          <div>
          <Switch>
            <Route path="/user" render={() => (
              <UserMain user={loggedUser} /> )}
            />
            <Route path="/groups" render={() => (
              <GroupsMain user={loggedUser} /> )}
            />
            <Route path="/projects" render={() => (
              <ProjectsMain user={loggedUser} /> )}
            />
            <Route path="/testplans" render={() => (
              <TestplansMain user={loggedUser} /> )}
            />
            <Route path="/workspace" render={() => (
              <WorkspaceMain user={loggedUser} /> )}
            />
            <Route path="/reports" render={() => (
              <ReportsMain user={loggedUser} funcs={{changeGroup:this.changeGroup}}/> )}
            />
            <Route path="/login" render={() => (
              <Redirect to="/user"/>)}
            />
            <Route path="/home" render={() => (
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
