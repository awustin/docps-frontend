import { hot } from 'react-hot-loader';
import React from 'react';
import AppLayout from '../AppLayout';

class ReportsMain extends React.Component {
    render() {
        return(
            <AppLayout>
                <div>
                    Reportes
                </div>
            </AppLayout>
        );
    }
}

export default hot(module)(ReportsMain);