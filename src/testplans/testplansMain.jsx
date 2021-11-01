import React from 'react';
import { withRouter } from "react-router";
import { Route, Switch } from 'react-router-dom';
import AppLayout from '../AppLayout';
import Testplan from './testplan';
import TestplanExport from './testplanExport';
import TestplanManagement from './testplanManagement';

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