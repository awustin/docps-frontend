import { hot } from 'react-hot-loader';
import React from 'react';
import {
    Button,
    Modal,
    Card,
    Tag,
    Row,
    Col,
    Popconfirm,
    message,
    Typography,
    Space,
    Divider,
    Tooltip,
} from 'antd';
import {
    PlusCircleOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import * as d from '../../AppConsts.json';
import EditExecutionButton from '../editExecutionButton'

const { Meta } = Card

class ExecutionList extends React.Component {
    constructor(props) {
        super(props)
        this.handleOk = this.handleOk.bind(this)
        this.handleDeleteExecution = this.handleDeleteExecution.bind(this)
        this.showExecutionList = this.showExecutionList.bind(this)
        this.showEmptyList = this.showEmptyList.bind(this)
    }
    state = {
        confirmLoading: false
    }

    setConfirmLoading(value) {
        this.setState({ confirmLoading: value })
    }

    handleDeleteExecution(id) {
        const { deleteExecution } = this.props
        deleteExecution(id)
        message.success("Ejecución eliminada.")
    }

    handleOk() {
        const { isModalVisible, reloadTestplan } = this.props
        this.setConfirmLoading(true);
        reloadTestplan();
        isModalVisible(false);
        this.setConfirmLoading(false);
    }

    showExecutionList() {
        const { list, updateExecution } = this.props
        let renderItems = []
        list.forEach(item => {
            renderItems.push(
                <Card className="execution-card"
                    style={{ borderRadius: "0.5em", marginBottom: 15, marginTop: 15 }}
                    actions={[
                        <EditExecutionButton key="edit-execution"
                            executionValues={{ id: item.id, status: item.status, commentary: item.commentary }}
                            updateExecution={updateExecution}
                        />,
                        <Tooltip key={`delete-${item.key}`} title="Eliminar ejecución" color="#108ee9">
                            <Popconfirm
                                title="¿Eliminar la ejecución?"
                                placement="bottom"
                                onConfirm={() => { this.handleDeleteExecution(item.id) }}
                                okText="Eliminar"
                                cancelText="No"
                            >
                                <DeleteOutlined key="delete-execution" />
                            </Popconfirm>
                        </Tooltip>,
                    ]}
                    key={'card-' + item.key}
                >
                    <Row style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
                        <Col flex="1 0 25%" style={{ textAlign: "center" }}>
                            {<Tag color={d.statuses[item.status].color}>{d.statuses[item.status].label}</Tag>}
                        </Col>
                        <Col flex="1 0 75%" style={{ textAlign: "justify" }}>
                            <div>{item.commentary}</div>
                        </Col>
                    </Row>
                    <Meta description={"Fecha de creación: " + item.createdOn} />
                </Card>
            )
        });
        return (renderItems)
    }

    showEmptyList() {
        const { Text } = Typography;
        return (
            <>
                <Space style={{ width: '100%', flexDirection: 'column', fontSize: '120%' }}>
                    <Text type="secondary">No hay ejecuciones.</Text>
                </Space>
                <Divider />
            </>
        )
    }

    render() {
        const { visible, list, addExecution } = this.props
        const { confirmLoading } = this.state
        return (
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
                    <div className="execution-list-container" style={{ margin: "10px" }}>
                        {(list.length > 0) ? (this.showExecutionList()) : (this.showEmptyList())}
                    </div>
                    <div className="execution-add" style={{ display: "flex", margin: "10px" }}>
                        <Button key="add-execution"
                            onClick={() => { addExecution() }}
                            icon={<PlusCircleOutlined style={{ fontSize: "110%" }} />}
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