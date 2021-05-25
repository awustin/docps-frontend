import { hot } from 'react-hot-loader';
import React from 'react';
import { Route,Switch } from 'react-router-dom';
import AppLayout from '../AppLayout';
import TestplanForm from './testplanForm';
import TestplanSearch from './testplanSearch';

class TestplansMain extends React.Component {
    render() {
        return(
            <AppLayout>
                <Switch>
                    <Route exact path="/testplans/create" render={() => (
                        <TestplanForm/>)}
                    />
                    <Route path="/testplans/create?p=:projectId&n=:projectName" render={() => (
                        <TestplanForm/>)}
                    />
                    <Route path="/testplans/search" render={() => (
                        <TestplanSearch/>)}
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