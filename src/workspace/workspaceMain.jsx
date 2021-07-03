import { hot } from 'react-hot-loader';
import React from 'react';
import { Route,Switch } from 'react-router-dom';
import { withRouter } from "react-router";
import AppLayout from '../AppLayout';
import Testcase from './testCases/testcase';

class WorkspaceMain extends React.Component {
    constructor(props){
        super(props)
        this.setTestplan = this.setTestplan.bind(this)
        this.fetchTestcase = this.fetchTestcase.bind(this)
        this.upsertTestcase = this.upsertTestcase.bind(this)
        this.addMessage = this.addMessage.bind(this)
        this.addStep = this.addStep.bind(this)
        this.editStep = this.editStep.bind(this)
        this.deleteStep = this.deleteStep.bind(this)
        this.addVariable = this.addVariable.bind(this)
        this.saveSteps = this.saveSteps.bind(this)
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
        },
        messages: [],
        modifiedSteps: false,
    }
    setTestplan(id, name) {
        const { testcase } = this.state
        testcase["testplanId"] = id
        testcase["testplanName"] = name
        this.setState({ testcase: testcase })
    }

    fetchTestcase(ids) {
        //Query
        //Si hay error mensaje y volver atrás
        let testcase = {
            id: ids.id,
            testcaseName: 'CASO-001',
            description: 'Este es un caso de prueba ya creado.',
            preconditions: 'Login',
            priority: 'Low',
            modifiedOn: '1/1/2021',
            isExported: false,
            testplanId: ids.testplanId,
            testplanName: ids.testplanName,
            projectId: 99,
            projectName: 'COMPANY-APP',
            groupId: 88,
            groupName: 'Pumas',
            steps: [
                {
                    action: 'Hacer algo',
                    result: 'Debe pasar esto',
                    data: 'Usar credenciales',
                    order: 0,
                    actionVariable: {
                        name: undefined,
                        values: undefined
                    },
                    resultVariable: {
                        name: undefined,
                        values: undefined
                    },
                    dataVariable: {
                        name: undefined,
                        values: undefined
                    }
                }
            ]
        }
        this.setState({ testcase: testcase })
    }

    upsertTestcase(values) {
        const { testcase } = this.state
        let newTestcase = testcase
        if( testcase.id === undefined )
        {
            //Insert(values)
            newTestcase.id = 999
            newTestcase.testcaseName = values.testcaseName
            newTestcase.description = values.description
            newTestcase.preconditions = values.preconditions
            newTestcase.priority = values.priority
            //si falla , mensaje y volver atrás
            //Con el insert, obtener id insertado
            //Hacer fetchTestcase para cargar el testcase desde la BD
            this.fetchTestcase({id: 777, testplanId: 7, testplanName: 'PLAN-002'})
            //Cargar mensaje de creado con exito
            this.addMessage('Caso de prueba creado con éxito','success')
            //redirigir a la vista de edición
            this.props.history.push("/workspace/id=" + testcase.id + "&p=" + testcase.testplanId + "&n=" + testcase.testplanName)
        }
        else
        {
            //Update
            //si falla mensaje
            newTestcase.testcaseName = values.testcaseName
            newTestcase.description = values.description
            newTestcase.preconditions = values.preconditions
            newTestcase.priority = values.priority
            this.setState({ testcase: newTestcase })
        }
    }

    addMessage(text,type) {
        const { messages } = this.state
        let newMessages = messages
        newMessages.push({ text: text, type: type})
        this.setState({ messages: newMessages })
    }

    addStep(values) {
        let { testcase } = this.state
        let list = testcase.steps
        let newstep = {
            action: values.action,
            result: values.result,
            data: values.data,
            order: list.length,
            actionVariable: {
                name: undefined,
                values: undefined
            },
            resultVariable: {
                name: undefined,
                values: undefined
            },
            dataVariable: {
                name: undefined,
                values: undefined
            }
        }
        if(list === undefined) {
            list = [newstep]
        }        
        else {
            list.push(newstep)
        }
        testcase.steps = list  
        this.setState({ testcase: testcase, modifiedSteps: true })
    }

    editStep(field, index, value) {
        const { testcase } = this.state
        let steps = testcase.steps
        steps[index][field] = value
        this.setState( prevState => ({
            testcase: {
                ...prevState.testcase,
                steps: steps
            }, 
            modifiedSteps: true 
        }))
    }

    deleteStep(index) {
        let { steps } = this.state.testcase
        
        steps.splice(index,1)
        for (let index = 0; index < steps.length; index++) {
            steps[index].order = index
        }
        this.setState( prevState => ({
            testcase: {
                ...prevState.testcase,
                steps: steps
            }, 
            modifiedSteps: true 
        }))
    }

    addVariable(index, field, data) {
        let { steps } = this.state.testcase
        let varType
        switch(field)
        {
            case 'action':
                varType = 'actionVariable'
                break
            case 'result':
                varType = 'resultVariable'
                break
            case 'data':
                varType = 'dataVariable'
                break
            default:
                break
        }
        steps[index][varType]['name'] = data.name
        steps[index][varType]['values'] = data.values
        this.setState( prevState => ({
            testcase: {
                ...prevState.testcase,
                steps: steps
            }, 
            modifiedSteps: true 
        }))
    }

    saveSteps() {
        this.addMessage('Pasos guardados','success')
        this.setState({ modifiedSteps: false })
    }

    render() {
        const { testcase, messages, modifiedSteps } = this.state
        return(
            <AppLayout>
                <Switch>
                    <Route exact path="/workspace/create?p=:testplanId&n=:testplanName" render={() => (
                        <Testcase action="create" 
                            testcase={testcase}
                            setTestplan={this.setTestplan}
                            upsertTestcase={this.upsertTestcase}
                            addStep={this.addStep}
                            editStep={this.editStep}
                            deleteStep={this.deleteStep}
                            saveSteps={this.saveSteps}
                            variablesOperations={{ addVariable: this.addVariable }}
                            messages={messages}
                            modifiedSteps={modifiedSteps}
                        />
                        )}
                    />
                    <Route exact path="/workspace/id=:id&p=:testplanId&n=:testplanName" render={() => (
                        <Testcase action="edit"
                            testcase={testcase}
                            fetchTestcase={this.fetchTestcase}
                            upsertTestcase={this.upsertTestcase}
                            addStep={this.addStep}
                            editStep={this.editStep}
                            deleteStep={this.deleteStep}
                            saveSteps={this.saveSteps}
                            variablesOperations={{ addVariable: this.addVariable }}
                            messages={messages}
                            modifiedSteps={modifiedSteps}
                        />
                        )}
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