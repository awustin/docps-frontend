import { hot } from 'react-hot-loader';
import React from 'react';
import { Route,Switch } from 'react-router-dom';
import AppLayout from '../AppLayout';
import GroupManagement from './groupManagement';

class GroupsMain extends React.Component {
    render() {
        const { user } = this.props
        return(
            <AppLayout user={user}>
                <Switch>
                    <Route path="/groups/admin" render={() => (
                        (user.isAdmin) ? (
                            <GroupManagement
                                user={user}
                            />
                        ) : (
                            <div>Ud no es administrador</div>
                        )                        
                        )}
                    />
                </Switch>
            </AppLayout>
        );
    }
}

export default hot(module)(GroupsMain);