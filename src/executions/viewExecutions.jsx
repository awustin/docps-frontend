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
        for (let index = 0; index < 3; index++) {
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