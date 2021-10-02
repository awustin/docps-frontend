import { hot } from 'react-hot-loader';
import React from 'react';
import {Switch, Route} from "react-router-dom"
import AppLayout from '../AppLayout';
import ReportsMainView from './reportsMainView';
import TestplansTestcasesCountReport from './testplansTestcasesCountReport';
import ExecutionsReport from './executionsReport';

class ReportsMain extends React.Component {
	render() {
		const { user, funcs } = this.props
		return(
			<AppLayout user={user}>
				<Switch>
					<Route exact path="/reports" render={() => (
						<ReportsMainView
							user={user}
							funcs={funcs}
						/>
					)}/>
					<Route path="/reports/testplansTestcasesCount" render={() => (
						<TestplansTestcasesCountReport
							user={user}						
						/>
					)}/>
					<Route path="/reports/executionsReport" render={() => (
						<ExecutionsReport
							user={user}						
						/>
					)}/>
					<Route path="/reports/" render={() => (
						<div> Not found </div>
					)}/>
				</Switch>
			</AppLayout>
		);
	}
}

export default hot(module)(ReportsMain);