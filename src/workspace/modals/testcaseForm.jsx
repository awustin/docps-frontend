import { hot } from 'react-hot-loader';
import React from 'react';
import {
    Typography,
    Tag,
    Button,
    Form,
    Input,
    Modal,
    Select,
    Divider,
} from 'antd';
import { 
    PlusOutlined,
} from '@ant-design/icons';
import * as d from '../../AppConsts.json';

class TestcaseForm extends React.Component {
    constructor(props){
        super(props)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.prioritiesOptions = this.prioritiesOptions.bind(this)
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
        const { isEditModalVisible } = this.props
        isEditModalVisible(false);
    }
    
    handleOk(values) {
        const { isEditModalVisible } = this.props
        this.setConfirmLoading(true);
        isEditModalVisible(false);
        this.setConfirmLoading(false);
    }

    prioritiesOptions() {
        const { Option } = Select
        const { priorities } = this.state
        let options = []
        let tagColor 
        Object.keys(priorities).map( item => {
            switch(item)
            {
                case "Low":
                    tagColor = '#6cdef5'
                    break
                case "Medium":
                    tagColor = '#f5b642'
                    break
                case "High":
                    tagColor = '#f56942'
                    break
                default:
                    break
            }
            options.push(
                <Option key={item} value={item}>
                    <Tag color={tagColor}>{priorities[item]}</Tag>
                </Option>
            )
        })
        return options
    }

    render() {
        const { visible } = this.props
        const { confirmLoading, tagItems, newTag } = this.state
        const { Title } = Typography
        const { Option } = Select
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        }
        const tailLayout = {
          wrapperCol: { offset: 7, span: 12 },
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
                        rules={[{ required: true, message: 'El nombre del caso de prueba está vacío.' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Descripción"
                        name="description"
                    >
                        <Input.TextArea 
                            maxLength={500}
                            autoSize={{ minRows: 5 }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Precondiciones"
                        name="preconditions"
                    >
                        <Input.TextArea 
                            maxLength={500}
                            autoSize={{ minRows: 5 }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Prioridad"
                        name="priority"
                    >
                        <Select>
                            {this.prioritiesOptions()}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            </>
        );
    }
}

export default hot(module)(TestcaseForm);