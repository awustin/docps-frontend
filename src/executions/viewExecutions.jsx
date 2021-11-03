import React from 'react';
import { getExecutionsForTestcase, createExecution, updateExecutionById, deleteExecutionById } from '../services/executionsService';
import {
    Tooltip,
} from 'antd';
import { withRouter } from "react-router";
import {
    ThunderboltOutlined,
} from '@ant-design/icons';
import ExecutionList from './modals/executionList';

class ViewExecutions extends React.Component {
	constructor(props){
			super(props)
			this.handleClick = this.handleClick.bind(this)
			this.isModalVisible = this.isModalVisible.bind(this)
			this.addExecution = this.addExecution.bind(this)
			this.updateExecution = this.updateExecution.bind(this)
			this.deleteExecution = this.deleteExecution.bind(this)
	}
	state = {
			showModal: false,
			executions: []
	}

	handleClick() {
			const { id } = this.props
			getExecutionsForTestcase(id).then( (result) => {
				this.setState({ executions: result.executions || [], showModal: true})
			})
	}
    
	isModalVisible(value) {
		this.setState({ showModal: value })
	}

	addExecution() {
		const { id, user } = this.props
		let values = {id: id, user: user.id}
		createExecution(values).then( (result) => {
			if(result.success) {				
				getExecutionsForTestcase(id).then( (result) => {
					if(result.success) {
						this.setState({ executions: result.executions })
					}
				})			
			}
		})
	}

	updateExecution(values) {
		const { id } = this.props
		updateExecutionById(values).then( (result) => {
			if(result.success) {
				getExecutionsForTestcase(id).then( (result) => {
					if(result.success) {
						this.setState({ executions: result.executions })		
					}
				})			
			}
		})
	}

	deleteExecution(executionId) {
		const { id } = this.props
		deleteExecutionById(executionId).then( (result) => {
			if(result.success) {				
				getExecutionsForTestcase(id).then( (result) => {
					if(result.success) {
						this.setState({ executions: result.executions })			
					}
				})			
			}
		})
	}

	render() {
		const { showModal, executions } = this.state
		const { reloadTestplan } = this.props
		return(
				<>
						<Tooltip title="Mostrar ejecuciones" color="#108ee9">
								<ThunderboltOutlined style={{ fontSize: '150%', color: "#108ee9"}} onClick={this.handleClick} />
						</Tooltip>
						<ExecutionList
								list={executions}
								addExecution={this.addExecution}
								updateExecution={this.updateExecution}
								deleteExecution={this.deleteExecution}
								visible={showModal} 
								isModalVisible={this.isModalVisible} 
								reloadTestplan={reloadTestplan}
						/>
				</>
		)
	}
}

export default withRouter(ViewExecutions);