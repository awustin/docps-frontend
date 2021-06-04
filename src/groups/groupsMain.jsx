import { hot } from 'react-hot-loader';
import React from 'react';
import { Route,Switch } from 'react-router-dom';
import AppLayout from '../AppLayout';
import GroupForm from '../groups/groupForm';


class ProjectsMain extends React.Component {
    render() {
        return(
            <AppLayout>
                <Switch>
                    <Route path="/groups/create" render={() => (
                        <GroupForm/>)}
                    />
                    <Route path="/groups" render={() => (
                        <div> Not found :( </div>)}
                    />
                </Switch>
            </AppLayout>
        );
    }
}

export default hot(module)(ProjectsMain);