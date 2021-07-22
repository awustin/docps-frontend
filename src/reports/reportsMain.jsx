import { hot } from 'react-hot-loader';
import React from 'react';
import {Switch, Route} from "react-router-dom"
import AppLayout from '../AppLayout';
import ReportsMainView from './reportsMainView';

class ReportsMain extends React.Component {
    render() {
				const { user } = this.props
        return(
            <AppLayout>
                <Switch>
                    <Route path="/reports" render={() => (
                        <ReportsMainView
													user={user}
												/>)}
                    />
                    <Route path="/reports/search" render={() => (
                        <div>reports/search</div>)}
                    />
                    <Route path="/reports/:id" render={() => (
                        <div>reports/:id</div>)}
                    />
                    <Route path="/reports/" render={() => (
                        <div> Not found :( </div>)}
                    />
                </Switch>
            </AppLayout>
        );
    }
}

export default hot(module)(ReportsMain);