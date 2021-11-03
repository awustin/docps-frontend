import {
    DeleteOutlined, PlusCircleOutlined
} from '@ant-design/icons';
import {
    Button, Divider, List, message, Modal, Popconfirm, Space, Tag, Tooltip, Typography
} from 'antd';
import React from 'react';
import { hot } from 'react-hot-loader';
import * as d from '../../AppConsts.json';
import EditExecutionButton from '../editExecutionButton';

const { Text, Title } = Typography

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
        return (
            <List
                size="small"
                pagination={{
                    pageSize: 5
                }}
                dataSource={list}
                bordered={false}
                renderItem={item => (
                    <List.Item
                        key={item.key}
                        span={4}
                        actions={[
                            <Tag key={`tag-${item.key}`} color={d.statuses[item.status].color}>{d.statuses[item.status].label}</Tag>,
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
                        className={'list-item executions'}
                        style={{ background: "#fff" }}
                    >
                        <Space direction="vertical" wrap>
                            {item.commentary ? item.commentary : <Text type="secondary"><i>Agregue un comentario.</i></Text>}
                            <div className={'executions-description'}>{'Fecha de creación: ' + item.createdOn}</div>
                        </Space>
                    </List.Item>
                )}
            />
        )
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
                    title={<Title level={3} >Ejecuciones</Title>}
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