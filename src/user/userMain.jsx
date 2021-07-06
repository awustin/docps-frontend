import { hot } from 'react-hot-loader';
import React from 'react';
import { Route,Switch } from 'react-router-dom';
import AppLayout from '../AppLayout';
import AdminUserView from './adminUserView';
import UserCreateForm from './userCreateForm';

class UserMain extends React.Component {
    render() {
        const { user } = this.props
        return(
            <AppLayout>
                <Switch>
                    <Route exact path="/user" render={() => (
                        (user.isAdmin) ? (
                            <AdminUserView
                                user={user}
                            />
                        ) : (
                            <div>Ud no es administrador</div>
                        )                        
                        )}
                    />
                    <Route path="/user/create" render={() => (
                        (user.isAdmin) ? (
                            <UserCreateForm
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

export default hot(module)(UserMain);