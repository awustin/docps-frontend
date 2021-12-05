import { Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import MessageModal from '../common/messageModal';
import { createProject, updateProject, getGroupsDropdown } from '../services/projectsService';

const { Option } = Select

export default function ProjectForm(props) {
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState({});
    const [groupList, setGroupList] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const { mode, open, close, user, project, reloadSearch } = props;
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };

    useEffect(() => {
        if (mode === 'add')
            getGroupsDropdown(user.id).then((result) => {
                const { success, groups } = result
                if (success)
                    setGroupList(groups);
            })
    }, []);

    function handleSubmit(values) {
        if (mode === 'add')
            createProject(values).then(result => handleResponse(result));
        else if (mode === 'update') {
            values.id = project.id;
            updateProject(values).then(result => handleResponse(result));
        }
    }

    function handleResponse(result) {
        if (!result.success) {
            setSuccess(false);
            if (result.validate) {
                setMessage({
                    title: 'Un proyecto con ese nombre ya existe',
                    description: 'Debe ingresar otro nombre.',
                    type: 'validate'
                });
                setShowMessage(true);
            }
            else {
                setMessage({
                    title: 'Hubo un error',
                    description: 'No se pudo crear el proyecto.',
                    type: 'validate'
                });
                setShowMessage(true);
            }
        }
        else {
            if (mode === 'add') {
                setMessage({
                    title: 'Proyecto creado',
                    description: 'Se creó el proyecto con éxito.',
                    type: 'success'
                });
            } else if (mode === 'update') {
                setMessage({
                    title: 'Proyecto modificado',
                    description: 'Se modificó el proyecto con éxito.',
                    type: 'success'
                });
            }
            setShowMessage(true);
            setSuccess(true);
            reloadSearch();
        }
    }

    return (
        <>
            <Modal
                title="Proyecto"
                visible={open}
                closable={false}
                width={700}
                okText="Confirmar"
                okButtonProps={{ form: 'projectForm', key: 'submit', htmlType: 'submit' }}
                cancelText="Cancelar"
                onCancel={close}
                destroyOnClose={true}
                maskClosable={false}
                keyboard={false}
            >
                <Form {...layout}
                    name="projectForm"
                    id="projectForm"
                    layout="horizontal"
                    onFinish={handleSubmit}
                    initialValues={
                        (project) ?
                            {
                                projectName: project.name
                            } : {}
                    }
                >
                    {(mode === 'add') ?
                        <Form.Item
                            label="Grupo"
                            name="projectGroup"
                            rules={[{ required: true, message: 'Seleccione un grupo.' }]}
                        >
                            <Select>
                                {groupList.map((e) => <Option key={e.key}>{e.name}</Option>)}
                            </Select>
                        </Form.Item>
                        :
                        <></>
                    }
                    <Form.Item
                        label="Nombre"
                        name="projectName"
                        rules={[{ required: true, message: 'El nombre del proyecto está vacío.' }]}
                    >
                        <Input />
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