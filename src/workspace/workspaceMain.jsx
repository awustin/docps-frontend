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
        this.upsertTestcase = this.upsertTestcase.bind(this)
        this.addStep = this.addStep.bind(this)
    }

    state = {
        testcase: {
            //properties
            id: undefined,
            testcaseName: undefined,
            description: undefined,
            preconditions: undefined,
            priority: undefined,
            modifiedOn: undefined,
            isExported: undefined,
            testplanId: undefined,
            testplanName: undefined,
            projectId: undefined,
            projectName: undefined,
            groupId: undefined,
            groupName: undefined,
            steps: []
        }
    }
    
    setTestcase(values) {
        const { testcase } = this.state
        testcase["id"] = values.id
        testcase["testplanId"] = values.testplanId
        testcase["testplanName"] = values.testplanName
        this.setState({ testcase: testcase })
    }

    setTestplan(id, name) {
        const { testcase } = this.state
        testcase["testplanId"] = id
        testcase["testplanName"] = name
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

    upsertTestcase(values) {
        const { testcase } = this.state
        console.log(values)
        let newTestcase = testcase
        if( testcase.id === undefined )
        {
            //Insert(values)
            //si falla , mensaje y volver atrás
            newTestcase.id = 0
            newTestcase.testcaseName = values.testcaseName
            newTestcase.description = values.description
            newTestcase.preconditions = values.preconditions
            newTestcase.priority = values.priority
        }
        else
        {
            //Update
            //si falla mensaje
            newTestcase.testplanName = values.testplanName
            newTestcase.description = values.description
            newTestcase.tags = values.tags || []
        }
        this.setState({ testcase: newTestcase })
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
                        <Testcase action="create" testcase={testcase} setTestplan={this.setTestplan} upsertTestcase={this.upsertTestcase} addStep={this.addStep}/>)}
                    />
                    <Route exact path="/workspace/id=:id&p=:testplanId&n=:testplanName" render={() => (
                        <Testcase action="edit" testcase={testcase} setTestcase={this.setTestcase} setTestplan={this.setTestplan} upsertTestcase={this.upsertTestcase} addStep={this.addStep}/>)}
                    />
                    <Route path="/workspace/search" render={() => (
                        <Testcase setTestcase={this.setTestcase}/>)}
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