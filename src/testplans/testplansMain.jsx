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
        this.fetchTestplan = this.fetchTestplan.bind(this)
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

    fetchTestplan(projectId, testplanId) {
        //Query
        let project = {
            projectId: projectId,
            projectName: 'PRO-124'
        }
        let testplan = {
            key: 'item'+testplanId,
            testplanId: testplanId,
            testplanName: 'ISSUE-1: Pruebas',
            description: 'Plan de pruebas para una funcionalidad',
            tags: ['integración','QA'],
            createdOn: '21/03/2021',
            status: 'Passed',
            projectId: projectId,
            projectName: 'PRO-124',
            groupId: 1,
            groupName: 'Pumas'
        }
        this.setState({ project: project, testplan: testplan })
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
                    <Route exact path="/testplans/id=:id" render={() => (
                        <Testplan testplan={testplan}/>)}
                    />
                    <Route path="/testplans/p=:projectId&id=:testplanId" render={() => (
                        <Testplan testplan={testplan} fetchTestplan={this.fetchTestplan}/>)}
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