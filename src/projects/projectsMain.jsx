import { hot } from 'react-hot-loader';
import React from 'react';
import AppLayout from '../AppLayout';

class ProjectsMain extends React.Component {
    render() {
        return(
            <AppLayout>
                <div>
                    ProjectsPage
                </div>
            </AppLayout>
        );
    }
}

export default hot(module)(ProjectsMain);