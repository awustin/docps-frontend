import { hot } from 'react-hot-loader';
import React from 'react';
import {Switch, Route} from "react-router-dom"
import AppLayout from '../AppLayout';
import ReportsMainView from './reportsMainView';

class ReportsMain extends React.Component {
    render() {
				const { user, funcs } = this.props
        return(
            <AppLayout user={user}>
                <Switch>
                    <Route path="/reports" render={() => (
                        <ReportsMainView
													user={user}
													funcs={funcs}
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