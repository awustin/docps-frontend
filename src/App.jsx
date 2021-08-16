import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import {UserLogIn, getGroupById} from './services/usersService';
import LoginPage from './login/loginPage';
import UserMain from './user/userMain';
import GroupsMain from './groups/groupsMain';
import ProjectsMain from './projects/projectsMain';
import TestplansMain from './testplans/testplansMain';
import WorkspaceMain from './workspace/workspaceMain';
import ExecutionsMain from './executions/executionsMain';
import ReportsMain from './reports/reportsMain';
import 'antd/dist/antd.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.userLogIn = this.userLogIn.bind(this)
		this.changeGroup = this.changeGroup.bind(this)
  }

  state = {
    loggedIn: true,
    usr: {
			id: 223,
			currentGroup: {
				id: 344,
				name: 'Pulpos'
			},
      isAdmin: true,
			memberOf: [
				{id:344, name:'Pulpos'},
				{id:999, name:'Águilas'}, 
				{id:101, name:'Leones'}
			]
    },
    error: undefined,
  };

  userLogIn(params) {
	  //Query para loggear. Trae el id de usuario, si es admin y el id del grupo al q está loggeado. Ademas una lista con los grupos de los q es miembro
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
            this.setState({ loggedIn: true, usr: {id:authUser,isAdmin:true}, error: undefined })
          }
        } else {
          this.setState({ error: (response.message !== 'Network Error') ? response.message : 'NETWORK_ERROR' });
        }
      });
  }

  userLogOut() {
    this.setState({ usr: undefined, error: undefined, loggedIn: false });
  }
	
	changeGroup(value) {
		let { usr } = this.state
		getGroupById(value)
			.then( (result) => {
				let { success, id, name } = result
				if(success)
				{
					this.setState({ usr:{...this.state.usr, currentGroup:{ id: id, name: name } } })					
				}
			})
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
            <Route path="/groups" render={() => (
              <GroupsMain user={usr} /> )}
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
            <Route path="/reports" render={() => (
              <ReportsMain user={usr} funcs={{changeGroup:this.changeGroup}}/> )}
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
