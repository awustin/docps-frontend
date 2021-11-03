import { hot } from 'react-hot-loader';
import React from 'react';
import {Switch, Route} from "react-router-dom"
import AppLayout from '../AppLayout';
import './ExecutionsStyles.css';

class ExecutionsMain extends React.Component {
    render() {
        return(
            <AppLayout>
                <Switch>
                    <Route path="/executions/create" render={() => (
                        <div>executions/create</div>)}
                    />
                    <Route path="/executions/search" render={() => (
                        <div>executions/search</div>)}
                    />
                    <Route path="/executions/:id" render={() => (
                        <div>executions/:id</div>)}
                    />
                    <Route path="/executions" render={() => (
                        <div> Not found :( </div>)}
                    />
                </Switch>
            </AppLayout>
        );
    }
}

export default hot(module)(ExecutionsMain);