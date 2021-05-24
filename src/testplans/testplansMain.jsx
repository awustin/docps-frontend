import { hot } from 'react-hot-loader';
import React from 'react';
import { Route,Switch } from 'react-router-dom';
import AppLayout from '../AppLayout';
import TestplanForm from './testplanForm';

class TestplansMain extends React.Component {
    render() {
        return(
            <AppLayout>
                <Switch>
                    <Route exact path="/testplans/create" render={() => (
                        <TestplanForm/>)}
                    />
                    <Route path="/testplans/create/:projectId" render={() => (
                        <TestplanForm/>)}
                    />
                    <Route path="/testplans/search" render={() => (
                        <>search</>)}
                    />
                    <Route path="/testplans/:id" render={() => (
                        <>testplanid</>)}
                    />
                    <Route path="/testplans" render={() => (
                        <div> Not found :( </div>)}
                    />
                </Switch>
            </AppLayout>
        );
    }
}

export default hot(module)(TestplansMain);