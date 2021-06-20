import { hot } from 'react-hot-loader';
import React from 'react';
import {
    Tooltip,
} from 'antd';
import {
    EditOutlined,
} from '@ant-design/icons';
import ExecutionEdit from './modals/executionEdit';

class ExecutionList extends React.Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.isModalVisible = this.isModalVisible.bind(this)
    }
    state = {
        showModal: false
    }

    handleClick() {
        this.setState({ showModal: true })
    }
    
    isModalVisible(value) {
        this.setState({ showModal: value })
    }

    render() {
        const { executionValues,updateExecution } = this.props
        const { showModal } = this.state
        return(
            <> 
            <Tooltip title="Modificar ejecución" color="#108ee9">
                <EditOutlined onClick={this.handleClick}/>
            </Tooltip>
            <ExecutionEdit
                executionValues={executionValues}
                updateExecution={updateExecution}
                visible={showModal} 
                isModalVisible={this.isModalVisible} 
            />
            </>
        );
    }
}

export default hot(module)(ExecutionList);