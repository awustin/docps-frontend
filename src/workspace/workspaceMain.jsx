import React from 'react';
import { withRouter } from "react-router";
import { Route, Switch } from 'react-router-dom';
import TestcaseView from '../testcases/testcaseView';
import './WorkspaceStyles.css';

class WorkspaceMain extends React.Component {
	render() {
		return (
			<Switch>
				<Route path="/workspace/testcase/id=:id" render={() => (
					<TestcaseView />)}
				/>
				<Route path="/workspace" render={() => (
					<div> Not found :( </div>)}
				/>
			</Switch>
		);
	}
}

export default withRouter(WorkspaceMain);