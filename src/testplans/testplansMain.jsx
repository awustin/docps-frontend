import { hot } from 'react-hot-loader';
import React from 'react';
import { Route,Switch } from 'react-router-dom';
import { withRouter } from "react-router";
import AppLayout from '../AppLayout';
import TestplanManagement from './testplanManagement';
import Testplan from './testplan';
import TestplanExport from './testplanExport';

class TestplansMain extends React.Component {
    constructor(props){
        super(props)
        this.setTestplan = this.setTestplan.bind(this)
        this.setProject = this.setProject.bind(this)
        this.updateTestplan = this.updateTestplan.bind(this)
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

    updateTestplan(values) {
        //Query
        const { testplan } = this.state
        let newTestplan = testplan
        newTestplan.testplanName = values.testplanName
        newTestplan.description = values.description
        newTestplan.tags = values.tags || []
        this.setState({ testplan: newTestplan })
    }

    render() {
        const { project, testplan } = this.state
        const { user } = this.props
        return(
            <AppLayout user={user}>
                <Switch>
                    <Route exact path="/testplans/manage" render={() => (
                        <TestplanManagement 
															user={user}
														/>)}
                    />
                    <Route exact path="/testplans/id=:testplanId" render={() => (
                        <Testplan
															user={user}															
														/>
													)}
                    />
                    <Route path="/testplans/p=:projectId&id=:testplanId" render={() => (
                        <Testplan testplan={testplan} fetchTestplan={this.fetchTestplan} updateTestplan={this.updateTestplan}/>)}
                    />
                    <Route path="/testplans/export" render={() => (
                        <TestplanExport testplan={testplan}/>)}
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