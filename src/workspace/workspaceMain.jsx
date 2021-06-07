import { hot } from 'react-hot-loader';
import React from 'react';
import { Route,Switch } from 'react-router-dom';
import { withRouter } from "react-router";
import AppLayout from '../AppLayout';
import Testcase from './testCases/testcase';

class WorkspaceMain extends React.Component {
    constructor(props){
        super(props)
        this.setTestcase = this.setTestcase.bind(this)
        this.setTestplan = this.setTestplan.bind(this)
        this.fetchTestcase = this.fetchTestcase.bind(this)
        this.updateTestcase = this.updateTestcase.bind(this)
        this.addStep = this.addStep.bind(this)
    }

    state = {
        testcase: {
            //properties
            testplanId: undefined,
            testplanName: undefined,
            projectId: undefined,
            projectName: undefined,
            groupId: undefined,
            groupName: undefined,
            steps: []
        }
    }
    
    setTestcase(testcase) {
        this.setState({ testcase: testcase })
    }

    setTestplan(id, name) {      
        const { testcase } = this.state
        testcase["testplanId"] = id
        testcase["testplanName"]  =name
        this.setState({ testcase: testcase })
    }

    fetchTestcase(projectId, testplanId) {
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

    updateTestcase(values) {
        //Query
        const { testplan } = this.state
        let newTestplan = testplan
        newTestplan.testplanName = values.testplanName
        newTestplan.description = values.description
        newTestplan.tags = values.tags || []
        this.setState({ testplan: newTestplan })
    }

    addStep(values) {
        let { testcase } = this.state
        let list = testcase.steps
        let newstep = {
            action: 'Hacer algo',
            result: 'Sucede A',
            data: 'Credenciales'
        }
        if(list === undefined)
            list = [newstep]
        else
            list.push(newstep)

        testcase.steps = list

        this.setState({ testcase: testcase})        
    }

    render() {
        const { testcase } = this.state
        return(
            <AppLayout>
                <Switch>
                    <Route exact path="/workspace/create?p=:testplanId&n=:testplanName" render={() => (
                        <Testcase testcase={testcase} setTestplan={this.setTestplan} addStep={this.addStep}/>)}
                    />
                    <Route path="/workspace/search" render={() => (
                        <Testcase setTestcase={this.setTestcase}/>)}
                    />
                    <Route exact path="/workspace/id=:id" render={() => (
                        <Testcase/>)}
                    />
                    <Route path="/workspace/p=:projectId&id=:testplanId" render={() => (
                        <Testcase/>)}
                    />
                    <Route path="/workspace" render={() => (
                        <div> Not found :( </div>)}
                    />
                </Switch>
            </AppLayout>
        );
    }
}

export default withRouter(WorkspaceMain);