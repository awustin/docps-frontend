import { hot } from 'react-hot-loader';
import React from 'react';
import {
    Typography,
    Button,
    Form,
    Input,
    Modal,
    Select,
    Divider,
} from 'antd';
import { 
    EditOutlined,
} from '@ant-design/icons';

class ExecutionEdit extends React.Component {
    constructor(props){
        super(props)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.statusOptions = this.statusOptions.bind(this)
    }
    state = {
        confirmLoading: false,
        statusItems:['Not executed','In progress','Passed','Failed']
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

    statusOptions() {
        const { Option } = Select
        const { statusItems } = this.state
        let options = []
        Object.keys(statusItems).map( item => {
            options.push(
                <Option key={item} value={statusItems[item]}>{statusItems[item]}</Option>
            )
        })
        return options
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
                        initialValue={executionValues.status}
                    >
                        <Select>
                            {this.statusOptions()}
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