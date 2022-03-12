import { Form, Input, Modal, Select, Tag } from 'antd';
import React, { useState } from 'react';
import * as d from '../AppConsts.json';
import MessageModal from '../common/messageModal';
import { createTestcase, updateTestcase } from '../services/workspaceService';

const { Option } = Select;

export default function TestcaseForm(props) {
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState({});
    const [showMessage, setShowMessage] = useState(false);
    const { mode, open, close, testcase, reloadSearch, testplanId } = props;
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };

    function handleSubmit(values) {
        console.log({ f: 'handleSubmit', values: values })
        if (mode === 'add') {
            values.id = testplanId;
            createTestcase(values).then(result => handleResponse(result))
        } else if (mode === 'update') {
            values.id = testcase.id;
            updateTestcase(values).then(result => handleResponse(result))
        }
    }

    function handleResponse(result) {
        if (!result.success) {
            setSuccess(false);
            setMessage({
                title: 'Hubo un error',
                description: 'No se pudo crear o modificar el caso de prueba.',
                type: 'validate'
            });
            setShowMessage(true);
        }
        else {
            if (mode === 'add')
                setMessage({
                    title: 'Caso de prueba creado',
                    description: 'Se creó el caso de prueba con éxito.',
                    type: 'success'
                });
            else
                setMessage({
                    title: 'Caso de prueba modificado',
                    description: 'Se modificó el caso de prueba con éxito.',
                    type: 'success'
                });
            setShowMessage(true);
            setSuccess(true);
            reloadSearch();
        }
    }

    return (<>
        <Modal
            title="Caso de prueba"
            visible={open}
            closable={false}
            width={700}
            okText="Confirmar"
            okButtonProps={{ form: 'testcaseForm', key: 'submit', htmlType: 'submit' }}
            cancelText="Cancelar"
            onCancel={close}
            destroyOnClose={true}
            maskClosable={false}
            keyboard={false}
        >
            <Form {...layout}
                name="testcaseForm"
                id="testcaseForm"
                layout="horizontal"
                onFinish={handleSubmit}
                initialValues={
                    (testcase) ?
                        {
                            name: testcase.name,
                            description: testcase.description,
                            preconditions: testcase.preconditions,
                            priority: (d.priorities[testcase.priority]) ? d.priorities[testcase.priority].id : undefined
                        } : {}
                }
            >
                <Form.Item
                    label="Nombre"
                    name="name"
                    rules={[
                        { required: true, message: 'El nombre del caso de prueba está vacío.' },
                        () => ({
                            validator(_, value) {
                                let onlyAlphanumericWhitespaceAndHyphen = /^[\w\s-]*$/;
                                if (onlyAlphanumericWhitespaceAndHyphen.test(value) || !value)
                                    return Promise.resolve();
                                else
                                    return Promise.reject(new Error('El nombre sólo puede contener letras, números, espacios y guiones (-)'));
                            },
                        })
                    ]}
                >
                    <Input />
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
                        {Object.keys(d.priorities).map((e) => {
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
        <MessageModal
            type={message.type}
            title={message.title}
            description={message.description}
            visible={showMessage}
            onClose={() => {
                setShowMessage(false)
                if (success)
                    close();
            }}
        />

    </>);
}