import { hot } from 'react-hot-loader';
import React from 'react';
import { Route,Switch } from 'react-router-dom';
import { withRouter } from "react-router";
import AppLayout from '../AppLayout';
import TestplanManagement from './testplanManagement';
import Testplan from './testplan';
import TestplanExport from './testplanExport';

class TestplansMain extends React.Component {
    constructor(props){
        super(props)
    }
    
    render() {
        const { user } = this.props
        return(
            <AppLayout user={user}>
                <Switch>
                    <Route exact path="/testplans/manage" render={() => (
                        <TestplanManagement 
															user={user}
														/>)}
                    />
                    <Route exact path="/testplans/id=:testplanId" render={() => (
                        <Testplan
															user={user}															
														/>
													)}
                    />
                    <Route exact path="/testplans/export=:id" render={() => (
                        <TestplanExport
															user={user}
														/>
													)}
                    />
                    <Route path="/testplans" render={() => (
                        <div> Not found :( </div>)}
                    />
                </Switch>
            </AppLayout>
        );
    }
}

export default withRouter(TestplansMain);