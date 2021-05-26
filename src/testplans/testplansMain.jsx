import { hot } from 'react-hot-loader';
import React from 'react';
import { Route,Switch } from 'react-router-dom';
import { withRouter } from "react-router";
import AppLayout from '../AppLayout';
import TestplanForm from './testplanForm';
import TestplanSearch from './testplanSearch';
import Testplan from './testplan';

class TestplansMain extends React.Component {
    constructor(props){
        super(props)
        this.setTestplan = this.setTestplan.bind(this)
        this.setProject = this.setProject.bind(this)
    }

    state = {
        project: {
            projectId: undefined,
            projectName: undefined
        },
        testplan: {
            key: undefined,
            testplanId: undefined,
            testplanName: undefined,
            description: undefined,
            tags: [],
            createdOn: undefined,
            status: undefined,
            projectId: undefined,
            projectName: undefined,
            groupId: undefined,
            groupName: undefined
        }
    }
    
    setTestplan(testplan) {
        this.setState({ testplan: testplan })
    }

    setProject(id, name) {      
        this.setState({
            project: {
                projectId: id,
                projectName: name
            }
        })
    }

    render() {
        const { project, testplan } = this.state
        return(
            <AppLayout>
                <Switch>
                    <Route exact path="/testplans/create" render={() => (
                        <TestplanForm project={{}}/>)}
                    />
                    <Route path="/testplans/create?p=:projectId&n=:projectName" render={() => (
                        <TestplanForm project={project} setProject={this.setProject}/>)}
                    />
                    <Route path="/testplans/search" render={() => (
                        <TestplanSearch setTestplan={this.setTestplan}/>)}
                    />
                    <Route path="/testplans/:id" render={() => (
                        <Testplan testplan={testplan}/>)}
                    />
                    <Route path="/testplans" render={() => (
                        <div> Not found :( </div>)}
                    />
                </Switch>
            </AppLayout>
        );
    }
}

export default withRouter(TestplansMain);