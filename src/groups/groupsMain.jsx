import { hot } from 'react-hot-loader';
import React from 'react';
import { Route,Switch } from 'react-router-dom';
import AppLayout from '../AppLayout';
import GroupCreateForm from './groupCreateForm';

class GroupsMain extends React.Component {
    render() {
        const { user } = this.props
        return(
            <AppLayout>
                <Switch>
                    <Route path="/groups/create" render={() => (
                        (user.isAdmin) ? (
                            <GroupCreateForm
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