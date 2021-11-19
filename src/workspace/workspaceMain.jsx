import React from 'react';
import { withRouter } from "react-router";
import { Route, Switch } from 'react-router-dom';
import { createTestcase, getTestcaseById, saveSteps, updateTestcase } from '../services/workspaceService';
import Testcase from './testCases/testcase';
import withUnloadPrevention from '../hocs/withUnloadPrevention';
import './WorkspaceStyles.css';

class WorkspaceMain extends React.Component {
	constructor(props) {
		super(props)
		this.setTestplan = this.setTestplan.bind(this)
		this.fetchTestcase = this.fetchTestcase.bind(this)
		this.upsertTestcase = this.upsertTestcase.bind(this)
		this.addMessage = this.addMessage.bind(this)
		this.addStep = this.addStep.bind(this)
		this.editStep = this.editStep.bind(this)
		this.deleteStep = this.deleteStep.bind(this)
		this.editVariable = this.editVariable.bind(this)
		this.deleteVariable = this.deleteVariable.bind(this)
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
		loading: true
	}

	setTestplan(id, name) {
		const { testcase } = this.state
		testcase["testplanId"] = id
		testcase["testplanName"] = name
		this.setState({ testcase: testcase, loading: false })
	}

	fetchTestcase(ids) {
		getTestcaseById(ids.id).then((result) => {
			if (result.success) {
				this.setState({ testcase: result.testcase, loading: false })
			}
		})
	}

	upsertTestcase(values) {
		const { testcase } = this.state
		let newTestcase = testcase
		if (testcase.id === undefined) {
			values.id = testcase.testplanId
			createTestcase(values).then((result) => {
				if (result.success) {
					const { id } = result
					newTestcase.id = id
					this.fetchTestcase({ id: id, testplanId: testcase.testplanId, testplanName: testcase.testplanName })
					this.addMessage('Caso de prueba creado con éxito', 'success')
					this.props.history.push("/workspace/id=" + testcase.id + "&p=" + testcase.testplanId + "&n=" + testcase.testplanName)
				}
				else {
					//msje de error
					this.props.history.goBack()
				}
			})
		}
		else {
			values.id = testcase.id
			updateTestcase(values).then((result) => {
				if (result.success) {
					const { testcase } = result
					newTestcase.testcaseName = testcase.testcaseName
					newTestcase.description = testcase.description
					newTestcase.preconditions = testcase.preconditions
					newTestcase.priority = testcase.priority
					this.setState({ testcase: newTestcase })
				}
				else {
					//si falla mensaje
					console.log(result.validate)
				}
			})
		}
	}

	addMessage(text, type) {
		const { messages } = this.state
		let newMessages = messages
		newMessages.push({ text: text, type: type })
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
		if (list === undefined) {
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
		this.setState(prevState => ({
			testcase: {
				...prevState.testcase,
				steps: steps
			},
			modifiedSteps: true
		}))
	}

	deleteStep(index) {
		let { steps } = this.state.testcase

		steps.splice(index, 1)
		for (let index = 0; index < steps.length; index++) {
			steps[index].order = index
		}
		this.setState(prevState => ({
			testcase: {
				...prevState.testcase,
				steps: steps
			},
			modifiedSteps: true
		}))
	}

	editVariable(index, field, data) {
		let { steps } = this.state.testcase
		let varType
		switch (field) {
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
		this.setState(prevState => ({
			testcase: {
				...prevState.testcase,
				steps: steps
			},
			modifiedSteps: true
		}))
	}

	deleteVariable(index, field) {
		let { steps } = this.state.testcase
		let varType
		switch (field) {
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
		steps[index][varType]['name'] = undefined
		steps[index][varType]['values'] = undefined
		this.setState(prevState => ({
			testcase: {
				...prevState.testcase,
				steps: steps
			},
			modifiedSteps: true
		}))
	}

	saveSteps() {
		const { testcase } = this.state
		let values = {
			id: testcase.id,
			steps: testcase.steps
		}
		console.log(values)
		saveSteps(values).then((result) => {
			if (result.success) {
				this.addMessage('Pasos guardados', 'success')
				this.setState({ modifiedSteps: false })
			}
		})
	}

	render() {
		const { testcase, messages, modifiedSteps, loading } = this.state
		return (
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
						variablesOperations={{ editVariable: this.editVariable, deleteVariable: this.deleteVariable }}
						messages={messages}
						modifiedSteps={modifiedSteps}
						loading={loading}
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
						variablesOperations={{ editVariable: this.editVariable, deleteVariable: this.deleteVariable }}
						messages={messages}
						modifiedSteps={modifiedSteps}
						loading={loading}
					/>
				)}
				/>
				<Route path="/workspace/p=:projectId&id=:testplanId" render={() => (
					<Testcase />)}
				/>
				<Route path="/workspace" render={() => (
					<div> Not found :( </div>)}
				/>
			</Switch>
		);
	}
}

export default withRouter(withUnloadPrevention(WorkspaceMain));