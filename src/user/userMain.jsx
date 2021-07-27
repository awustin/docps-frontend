import { hot } from 'react-hot-loader';
import React from 'react';
import { Route,Switch,Redirect } from 'react-router-dom';
import AppLayout from '../AppLayout';
import AdminUserView from './adminUserView';
import UserManagement from './userManagement';

class UserMain extends React.Component {
    render() {
        const { user } = this.props
        return(
            <AppLayout user={user}>
                <Switch>
                    <Route exact path="/user/home" render={() => (
                        (user.isAdmin) ? (
                            <AdminUserView
                                user={user}
                            />
                        ) : (
                            <div>Ud no es administrador</div>
                        )                        
                        )}
                    />
                    <Route exact path="/user/admin" render={() => (
                        (user.isAdmin) ? (
                            <UserManagement
                                user={user}
                            />
                        ) : (
                            <div>Ud no es administrador</div>
                        )                        
                        )}
                    />
                    <Route path="/user" render={() => (
											<Redirect to="/user/home"/>)}
                    />
                </Switch>
            </AppLayout>
        );
    }
}

export default hot(module)(UserMain);