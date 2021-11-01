import { hot } from 'react-hot-loader';
import React from 'react';
import {
    Form,
    Input,
    Modal,
    Select,
} from 'antd';
import { 
    EditOutlined,
} from '@ant-design/icons';
import * as d from '../../AppConsts.json';

const { Option } = Select

class ExecutionEdit extends React.Component {
    constructor(props){
        super(props)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    state = {
        confirmLoading: false
    }

    setConfirmLoading(value) {
        this.setState({ confirmLoading: value })
    }
    
    handleCancel() {
        const { isModalVisible } = this.props
        isModalVisible(false);
    }
    
    handleOk(values) {
        const { isModalVisible, executionValues, updateExecution } = this.props
        this.setConfirmLoading(true)
        values["id"] = executionValues.id
        updateExecution(values)
        isModalVisible(false)
        this.setConfirmLoading(false)
    }

    render() {
        const { visible, executionValues } = this.props
        const { confirmLoading } = this.state
        const layout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 24 },
        }
        return(
            <> 
            <Modal
                title="Modificar ejecución"
                visible={visible}
                confirmLoading={confirmLoading}
                destroyOnClose={true}
                okButtonProps={{form:'editExecutionForm', key: 'submit', htmlType: 'submit'}}
                okText="Confirmar"
                onCancel={this.handleCancel}
                cancelText="Cancelar"
            >
                <Form {...layout}
                    name="testplanEditForm"
                    id="editExecutionForm"
                    layout="horizontal"
                    onFinish={this.handleOk}
                >
                    <Form.Item
                        label="Estado"
                        name="status"
                        initialValue={d.statuses[executionValues.status].value}
                    >
                        <Select>
															{Object.keys(d.statuses).map( s => <Option key={d.statuses[s].value} value={d.statuses[s].value}>{d.statuses[s].label}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Comentario"
                        name="commentary"
                        initialValue={executionValues.commentary}
                    >
                        <Input.TextArea maxLength={500}
                            autoSize={{ minRows: 3 }}
                            prefix={<EditOutlined className="add-comment-icon" />}
                            placeholder="Agregar un comentario..."
                        />
                    </Form.Item>
                </Form>
            </Modal>
            </>
        );
    }
}

export default hot(module)(ExecutionEdit);