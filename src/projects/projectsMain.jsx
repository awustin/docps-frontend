import { withRouter } from "react-router";
import React from 'react';
import { Route,Switch } from 'react-router-dom';
import AppLayout from '../AppLayout';
import ProjectForm from '../projects/projectForm';
import ProjectManagement from './projectManagement';

class ProjectsMain extends React.Component {
    render() {
        const { user } = this.props
        return(
            <AppLayout user={user}>
                <Switch>								
										<Route path="/projects/manage" render={() => (
											<ProjectManagement
												user={user}
											/>
											)}
										/>
                    <Route path="/projects/create" render={() => (
                        <ProjectForm/>)}
                    />
                    <Route path="/projects" render={() => (
                        <div> Not found :( </div>)}
                    />
                </Switch>
            </AppLayout>
        );
    }
}

export default withRouter(ProjectsMain);