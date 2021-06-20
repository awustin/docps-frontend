import React from 'react';
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
    }
    state = {
        showModal: false,
        executions: []
    }

    handleClick() {
        const { id } = this.props
        let statuses = ['Not executed','In progress','Passed','Failed']
        let list = []
        //Query execution list with testcase id. Then show modal
        for (let index = 0; index < 2; index++) {
            list.push({
                id: index,
                key: index*2,
                status: statuses[Math.floor(Math.random() * statuses.length)],
                commentary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                createdOn: '1/1/2021'
            })   
        }
        this.setState({ executions: list, showModal: true })
    }
    
    isModalVisible(value) {
        this.setState({ showModal: value })
    }

    addExecution() {
        //Query to insert execution
        //Query to fetch executions
        //refresh state
        let { executions } = this.state
        var today = new Date();
        let newExecution = {
            id: 99,
            key: 99*2,
            status: 'Not executed',
            commentary: '',
            createdOn: today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
        }
        executions.push(newExecution)
        this.setState({ executions: executions })
    }

    updateExecution(values) {
        //Query to update execution by Id
        //Query to fetch executions
        //refresh state
        let { executions } = this.state
        executions.forEach( (e) => {
            if(e.id === values.id)
            {
                e.status = values.status
                e.commentary = values.commentary
            }
        })
        this.setState({ executions: executions })
    }

    render() {
        const { showModal, executions } = this.state
        return(
            <>
                <Tooltip title="Mostrar ejecuciones" color="#108ee9">
                    <ThunderboltOutlined style={{ fontSize: '150%', color: "#000"}} onClick={this.handleClick} />
                </Tooltip>
                <ExecutionList
                    list={executions}
                    addExecution={this.addExecution}
                    updateExecution={this.updateExecution}
                    visible={showModal} 
                    isModalVisible={this.isModalVisible} 
                />
            </>
        )
    }
}

export default withRouter(ViewExecutions);