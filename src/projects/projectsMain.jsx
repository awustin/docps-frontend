import { hot } from 'react-hot-loader';
import React from 'react';
import { Route,Switch } from 'react-router-dom';
import AppLayout from '../AppLayout';
import ProjectForm from '../projects/projectForm';
import ProjectSearch from '../projects/projectSearch';
import Project from '../projects/project';

class ProjectsMain extends React.Component {
    render() {
        const { user } = this.props
        return(
            <AppLayout user={user}>
                <Switch>
                    <Route path="/projects/create" render={() => (
                        <ProjectForm/>)}
                    />
                    <Route path="/projects/search" render={() => (
                        <ProjectSearch/>)}
                    />
                    <Route path="/projects/:id" render={() => (
                        <Project/>)}
                    />
                    <Route path="/projects" render={() => (
                        <div> Not found :( </div>)}
                    />
                </Switch>
            </AppLayout>
        );
    }
}

export default hot(module)(ProjectsMain);