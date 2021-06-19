import { hot } from 'react-hot-loader';
import React from 'react';
import {
    Button,
    Modal,
    Card,
} from 'antd';

class ExecutionList extends React.Component {
    constructor(props){
        super(props)
        this.handleOk = this.handleOk.bind(this)
        this.showExecutionList = this.showExecutionList.bind(this)
    }
    state = {
        confirmLoading: false
    }

    setConfirmLoading(value) {
        this.setState({ confirmLoading: value })
    }
    
    handleOk(values) {
        const { isModalVisible } = this.props
        this.setConfirmLoading(true);
        //close
        isModalVisible(false);
        this.setConfirmLoading(false);
    }

    showExecutionList() {
        const { list } = this.props
        let renderItems = []
        list.forEach(item => {
            renderItems.push(
                <Card key={item.key}>{item.status} {item.commentary} {item.createdOn}</Card>
            )
        });
        return(renderItems)
    }

    render() {
        const { visible } = this.props
        const { confirmLoading } = this.state
        return(
            <> 
            <Modal
                title="Ejecuciones"
                visible={visible}
                confirmLoading={confirmLoading}
                destroyOnClose={true}
                width={800}
                closable={false}
                footer={[<Button key="close" onClick={this.handleOk}>Cerrar</Button>]}
            >
                <div className="execution-list-container"  style={{margin: "10px"}}>
                    {this.showExecutionList()}
                </div>
            </Modal>
            </>
        );
    }
}

export default hot(module)(ExecutionList);