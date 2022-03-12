import { Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import MessageModal from '../common/messageModal';
import { getGroupsDropdown, getProjectsDropdown } from '../services/projectsService';
import { createTestplan, getTagsForTestplan, updateTestplan } from '../services/testplansService';

const { Option } = Select

export default function TestplanForm(props) {
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState({});
    const [groupOptions, setGroupOptions] = useState([]);
    const [projectOptions, setProjectOptions] = useState([]);
    const [tagItems, setTagItems] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const { mode, open, close, user, reloadSearch, groupId, projectId, id, testplan } = props;
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };

    useEffect(() => {
        if (user)
            getGroupsDropdown(user.id).then((result) => {
                const { success, groups } = result
                if (success)
                    setGroupOptions(groups);
            })
    }, []);

    function handleSubmit(values) {
        if (mode === 'add') {
            createTestplan(values).then(result => handleResponse(result));
        }
        else if (mode == 'add-to-project') {
            values.groupId = groupId;
            values.projectId = projectId;
            createTestplan(values).then(result => handleResponse(result));
        } else if (mode == 'update') {
            values.id = id;
            updateTestplan(values).then(result => handleResponse(result));
        }
    }

    function handleResponse(result) {
        if (!result.success) {
            setSuccess(false);
            if (result.validate) {
                setMessage({
                    title: 'Un plan de pruebas con ese nombre ya existe en este proyecto',
                    description: 'Debe ingresar otro nombre',
                    type: 'validate'
                });
                setShowMessage(true);
            }
            else {
                setMessage({
                    title: 'Hubo un error',
                    description: 'No se pudo crear o modificar el plan de pruebas.',
                    type: 'validate'
                });
                setShowMessage(true);
            }
        }
        else {
            if (mode !== 'udpate')
                setMessage({
                    title: 'Plan de pruebas modificado',
                    description: 'Se modificó el plan de pruebas con éxito.',
                    type: 'success'
                });
            else
                setMessage({
                    title: 'Plan de pruebas creado',
                    description: 'Se creó el plan de pruebas con éxito.',
                    type: 'success'
                });
            setShowMessage(true);
            setSuccess(true);
            reloadSearch();
        }
    }

    return (
        <>
            <Modal
                title="Plan de pruebas"
                visible={open}
                closable={false}
                width={700}
                okText="Confirmar"
                okButtonProps={{ form: 'testplanForm', key: 'submit', htmlType: 'submit' }}
                cancelText="Cancelar"
                onCancel={close}
                destroyOnClose={true}
                maskClosable={false}
                keyboard={false}
            >
                <Form {...layout}
                    name="testplanForm"
                    id="testplanForm"
                    layout="horizontal"
                    onFinish={handleSubmit}
                    initialValues={
                        (testplan) ?
                            {
                                name: testplan.testplanName,
                                description: testplan.description,
                                tags: testplan.tags
                            } : {}
                    }

                >
                    {(mode === 'add') ? <>
                        <Form.Item
                            label="Grupo"
                            name="groupId"
                            rules={[{ required: true, message: 'Seleccione un grupo.' }]}
                        >
                            <Select
                                allowClear
                                placeholder="Seleccione un grupo"
                                onChange={id => {
                                    getProjectsDropdown(id).then((result) => {
                                        if (result.success)
                                            setProjectOptions(result.projects)
                                    })
                                }}
                            >
                                {groupOptions.map(e => (<Option key={e.key}>{e.name}</Option>))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Proyecto"
                            name="projectId"
                            rules={[{ required: true, message: 'Seleccione un proyecto.' }]}
                        >
                            <Select
                                disabled={(projectOptions || []).length === 0}
                                placeholder="Seleccione un proyecto"
                            >
                                {projectOptions.map(item => (<Option key={item.id}>{item.name}</Option>))}
                            </Select>
                        </Form.Item>
                    </>
                        :
                        <></>
                    }
                    <Form.Item
                        label="Nombre"
                        name="name"
                        rules={[
                            { required: true, message: 'El nombre del plan está vacío.' },
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
                        label="Descripcion"
                        name="description"
                    >
                        <Input.TextArea
                            maxLength={500}
                            autoSize={{ minRows: 5 }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Etiquetas"
                        name="tags"
                    >
                        <Select
                            mode="tags"
                            onDropdownVisibleChange={() => {
                                getTagsForTestplan().then((result) => {
                                    if (result.success)
                                        setTagItems(result.tags)
                                })
                            }}
                        >
                            {tagItems.map(item => <Option key={item.tag}>{item.tag}</Option>)}
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
        </>
    );
}