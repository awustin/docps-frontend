import { EditOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import * as d from '../AppConsts.json';
import MessageModal from '../common/messageModal';
import { updateExecutionById } from '../services/executionsService';

const { Option } = Select;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
};

const ExecutionsEditForm = (props) => {
    const [message, setMessage] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [form] = Form.useForm();
    const { visible, execution, close } = props;

    const onFinish = (values) => {
        values.id = execution.id;
        updateExecutionById(values).then(() => {
            setMessage({
                type: 'success',
                title: 'Ejecución modificada',
                description: 'Se modificó la ejecución con éxito.'
            })
            setShowMessage(true);
        })
    };

    useEffect(() => {
        if (execution.id)
            form.setFieldsValue({
                status: d.statuses[execution.status].value,
                commentary: execution.commentary
            })
    }, [execution])

    return (<>
        <Modal
            title="Modificar ejecución"
            visible={visible}
            destroyOnClose={true}
            okButtonProps={{ form: 'editExecutionForm', key: 'submit', htmlType: 'submit' }}
            okText="Confirmar"
            onCancel={close}
            cancelText="Cancelar"
        >
            <Form {...layout}
                form={form}
                name="testplanEditForm"
                id="editExecutionForm"
                layout="horizontal"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Estado"
                    name="status"
                >
                    <Select>
                        {Object.keys(d.statuses).map(s => <Option key={d.statuses[s].value} value={d.statuses[s].value}>{d.statuses[s].label}</Option>)}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Comentario"
                    name="commentary"
                >
                    <Input.TextArea maxLength={500}
                        autoSize={{ minRows: 3 }}
                        prefix={<EditOutlined className="add-comment-icon" />}
                        placeholder="Agregar un comentario..."
                    />
                </Form.Item>
            </Form>
        </Modal>
        <MessageModal
            type={message.type}
            title={message.title}
            description={message.description}
            visible={showMessage}
            onClose={() => {
                setShowMessage(false)
                close();
            }}
        />

    </>)
}

export default ExecutionsEditForm;