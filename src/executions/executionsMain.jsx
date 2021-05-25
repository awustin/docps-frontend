import { hot } from 'react-hot-loader';
import React from 'react';
import AppLayout from '../AppLayout';

class ExecutionsMain extends React.Component {
    render() {
        return(
            <AppLayout>
                <div>
                    Executions
                    <h1>testing</h1>
                </div>
            </AppLayout>
        );
    }
}

export default hot(module)(ExecutionsMain);