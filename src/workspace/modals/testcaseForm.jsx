import {
    Form,
    Input,
    Modal,
    Select, Tag
} from 'antd';
import React from 'react';
import { withRouter } from "react-router";
import * as d from '../../AppConsts.json';

const { Option } = Select;

class TestcaseForm extends React.Component {
    constructor(props){
        super(props)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    state = {
        confirmLoading: false,
        priorities: d.priorities,
        values: {}
    }

    setVisible(value) {
        this.setState({ visible: value })
    }

    setConfirmLoading(value) {
        this.setState({ confirmLoading: value })
    }

    setProjectName(value) {
        this.setState({ projectName: value })
    }
    
    handleCancel() {
        const { isEditModalVisible,values } = this.props
        isEditModalVisible(false)
        if( values.id === undefined )
            this.props.history.goBack()
    }
    
    handleOk(values) {
        const { isEditModalVisible,upsertTestcase } = this.props
        this.setConfirmLoading(true)
        isEditModalVisible(false)
        upsertTestcase(values)
        this.setConfirmLoading(false)
    }

    render() {
        const { visible, values } = this.props
        const { confirmLoading } = this.state
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        }
        return(
            <> 
            <Modal
                title="Crear caso de prueba"
                visible={visible}
                confirmLoading={confirmLoading}
                destroyOnClose={true}
                okButtonProps={{form:'editForm', key: 'submit', htmlType: 'submit'}}
                okText="Confirmar"
                onCancel={this.handleCancel}
                cancelText="Cancelar"
                closable={false}
                maskClosable={false}
                keyboard={false}
            >
                <Form {...layout}
                    name="testcaseForm"
                    id="editForm"
                    layout="horizontal"
                    onFinish={this.handleOk}
                >
                    <Form.Item
                        label="Nombre"
                        name="testcaseName"
                        initialValue={values.name}
                        rules={[{ required: true, message: 'El nombre del caso de prueba está vacío.' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Descripción"
                        name="description"
                        initialValue={values.description}
                    >
                        <Input.TextArea 
                            maxLength={500}
                            autoSize={{ minRows: 5 }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Precondiciones"
                        name="preconditions"
                        initialValue={values.preconditions}
                    >
                        <Input.TextArea 
                            maxLength={500}
                            autoSize={{ minRows: 5 }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Prioridad"
                        name="priority"
                        initialValue={(d.priorities[values.priority]) ? d.priorities[values.priority].id : undefined}
                    >
                        <Select>
															{ Object.keys(d.priorities).map( (e) => {
																	return (
																	<Option key={d.priorities[e].id} value={d.priorities[e].id}>
																			<Tag color={d.priorities[e].color}>{d.priorities[e].label}</Tag>
																	</Option>)
																})
															}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            </>
        );
    }
}

export default withRouter(TestcaseForm);