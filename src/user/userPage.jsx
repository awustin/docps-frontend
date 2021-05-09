import { hot } from 'react-hot-loader';
import React from 'react';
import AppLayout from '../homepage/appLayout';

class UserPage extends React.Component {
    render() {
        return(
            <AppLayout>
                <div>
                    UserPage
                </div>
            </AppLayout>
        );
    }
}

export default hot(module)(UserPage);