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
    PlusOutlined,
} from '@ant-design/icons';

class TestplanEdit extends React.Component {
    constructor(props){
        super(props)
        this.onNewTagChange = this.onNewTagChange.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    state = {
        confirmLoading: false,
        tagItems:['uno','dos','tres'],
        newTag:'',
        newTestplanAttributes: {
            name: '',
            description: '',
            tags: ''
        }
    }

    setVisible(value) {
        this.setState({ visible: value })
    }
    
    onNewTagChange(e) {
        this.setState({ newTag: e.target.value })
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
        const { isEditModalVisible, updateTestplan } = this.props
        this.setConfirmLoading(true);
        updateTestplan(values);
        isEditModalVisible(false);
        this.setConfirmLoading(false);
    }

    render() {
        const { visible, testplanAttributes, description, tags } = this.props
        const { confirmLoading, tagItems, newTag } = this.state
        const { Title } = Typography
        const { Option } = Select
        const layout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        }
        const tailLayout = {
          wrapperCol: { offset: 7, span: 12 },
        }
        return(
            <> 
            <Modal
                title="Editar plan de pruebas"
                visible={visible}
                confirmLoading={confirmLoading}
                destroyOnClose={true}
                okButtonProps={{form:'editForm', key: 'submit', htmlType: 'submit'}}
                okText="Confirmar"
                onCancel={this.handleCancel}
                cancelText="Cancelar"
            >
                <Form {...layout}
                    name="testplanEditForm"
                    id="editForm"
                    layout="horizontal"
                    onFinish={this.handleOk}
                >
                    <Form.Item
                        label="Nombre"
                        name="testplanName"
                        initialValue={testplanAttributes[0]}
                        rules={[{ required: true, message: 'El nombre del proyecto está vacío.' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Descripción"
                        name="description"
                        initialValue={testplanAttributes[1]}
                    >
                        <Input.TextArea 
                            maxLength={500}
                            autoSize={{ minRows: 5 }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Etiquetas"
                        name="tags"
                        initialValue={testplanAttributes[2]}
                    >
                        <Select 
                            mode="tags"
                            dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: '4px 0' }} />
                                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                        <Input style={{ flex: 'auto' }} value={newTag} onChange={this.onNewTagChange} />
                                        <a
                                            style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                            onClick={this.addItemTag}
                                        >
                                            <PlusOutlined /> Agregar etiqueta
                                        </a>
                                    </div>
                                </div>
                            )}                            
                        >
                            {tagItems.map(item => <Option key={item}>{item}</Option>)}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            </>
        );
    }
}

export default hot(module)(TestplanEdit);