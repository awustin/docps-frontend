import React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from "react-router-dom";
import ExecutionsReport from './executionsReport';
import ReportsMainView from './reportsMainView';
import TestplansTestcasesCountReport from './testplansTestcasesCountReport';

class ReportsMain extends React.Component {
	render() {
		const { user, funcs } = this.props
		return (
			<Switch>
				<Route exact path="/reports" render={() => (
					<ReportsMainView
						user={user}
						funcs={funcs}
					/>
				)} />
				<Route path="/reports/testplansTestcasesCount" render={() => (
					<TestplansTestcasesCountReport
						user={user}
					/>
				)} />
				<Route path="/reports/executionsReport" render={() => (
					<ExecutionsReport
						user={user}
					/>
				)} />
				<Route path="/reports/" render={() => (
					<div> Not found </div>
				)} />
			</Switch>
		);
	}
}

export default hot(module)(ReportsMain);