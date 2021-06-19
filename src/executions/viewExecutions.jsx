import React from 'react';
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
        console.log('Fetching executions for testcase id: ' + id)
        for (let index = 0; index < 3; index++) {
            list.push({
                id: index,
                key: index*2,
                status: statuses[Math.floor(Math.random() * statuses.length)],
                commentary: 'Esta ejecución es de prueba',
                createdOn: '1/1/2021'
            })   
        }
        this.setState({ executions: list, showModal: true })
    }
    
    isModalVisible(value) {
        this.setState({ showModal: value })
    }

    render() {
        const { showModal, executions } = this.state
        return(
            <>
                <ThunderboltOutlined style={{ fontSize: '150%', color: "#000"}} onClick={this.handleClick} />
                <ExecutionList
                    list={executions}
                    visible={showModal} 
                    isModalVisible={this.isModalVisible} 
                />
            </>
        )
    }
}

export default withRouter(ViewExecutions);