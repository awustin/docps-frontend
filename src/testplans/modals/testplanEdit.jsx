import { hot } from 'react-hot-loader';
import React from 'react';
import {
    Typography,
    Button,
    Form,
    Input,
    Modal,
} from 'antd';

class TestplanEdit extends React.Component {
    constructor(props){
        super(props)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    state = {
        confirmLoading: false,
        newProjectName: ''
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
    
    handleOk() {
        const { newProjectName } = this.state
        const { isEditModalVisible, updateProjectName } = this.props
        this.setConfirmLoading(true);
        updateProjectName(newProjectName);
        isEditModalVisible(false);
        this.setConfirmLoading(false);
    }

    render() {
        const { visible, projectName } = this.props
        const { confirmLoading } = this.state
        const { Title } = Typography
        return(
            <> 
            <Modal
                title="Editar proyecto"
                visible={visible}
                onOk={this.handleOk}
                okText={'Guardar'}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
                cancelText={'Cancelar'}
                destroyOnClose={true}
            >
                <Form>
                    <Form.Item
                        label="Nombre"
                        name="projectName"
                        initialValue={projectName}
                        rules={[{ required: true, message: 'El nombre del proyecto está vacío.' }]}
                    >
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
            </>
        );
    }
}

export default hot(module)(TestplanEdit);