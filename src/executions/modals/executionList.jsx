import { hot } from 'react-hot-loader';
import React from 'react';
import {
    Button,
    Modal,
    Card,
    Tag,
    Row,
    Col,
} from 'antd';
import {
    PlusCircleOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import EditExecutionButton from '../editExecutionButton'

const { Meta } = Card

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
    
    handleOk() {
        const { isModalVisible } = this.props
        this.setConfirmLoading(true);
        //close
        isModalVisible(false);
        this.setConfirmLoading(false);
    }

    showExecutionList() {
        const { list,updateExecution } = this.props
        let renderItems = []
        list.forEach(item => {
            renderItems.push(
                <Card className="execution-card" 
                    style={{ borderRadius: "0.5em", marginBottom: 15, marginTop: 15 }} 
                    actions={[
                        <EditExecutionButton key="edit-execution"
                            executionValues={{ id: item.id, status: item.status , commentary: item.commentary }}
                            updateExecution={updateExecution}
                        />,
                        <DeleteOutlined key="delete-execution" />,
                    ]}
                    key={'card-' + item.key}
                >
                    <Row style={{display: "flex", alignItems: "center", marginBottom: 15}}>
                        <Col flex="1 0 25%" style={{ textAlign: "center" }}>
                        {this.statusTag(item.status)}
                        </Col>
                        <Col flex="1 0 75%" style={{ textAlign: "justify" }}>
                        <div>{item.commentary}</div>
                        </Col>
                    </Row>
                    <Meta description={"Fecha de creación: " + item.createdOn}/>
                </Card>
            )
        });
        return(renderItems)
    }

    statusTag(status) {
        switch(status)
        {
            case 'Not executed':
                return <Tag color="#999997">No ejecutado</Tag>
            case 'In progress':
                return <Tag color="#ebcf52">En progreso</Tag>
            case 'Passed':
                return <Tag color="#09de8c">Pasó</Tag>
            case 'Failed':
                return <Tag color="#f50">Falló</Tag>
        }
    }

    render() {
        const { visible,addExecution } = this.props
        const { confirmLoading } = this.state
        return(
            <> 
            <Modal
                title="Ejecuciones"
                visible={visible}
                confirmLoading={confirmLoading}
                destroyOnClose={true}
                width={700}
                closable={false}
                footer={[<Button key="close" onClick={this.handleOk}>Cerrar</Button>]}
            >
                <div className="execution-list-container"  style={{margin: "10px"}}>
                    {this.showExecutionList()}
                </div>
                <div className="execution-add" style={{display: "flex", margin: "10px"}}>
                    <Button key="add-execution"
                        onClick={ ()=> {addExecution()} }
                        icon={<PlusCircleOutlined style={{ fontSize: "110%" }}/> }
                        type="primary"
                    >
                        Agregar ejecución
                    </Button>
                </div>
            </Modal>
            </>
        );
    }
}

export default hot(module)(ExecutionList);