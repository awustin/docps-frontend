import { Col, Form, Input, Modal, Select, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import MessageModal from '../common/messageModal';
import { createGroup, getUsersForGroups, updateGroup } from '../services/groupsService';

const { Text } = Typography;
const { Option } = Select

export default function GroupForm(props) {
    const [userList, setUserList] = useState([]);
    const [adminMembersOptions, setAdminMembersOptions] = useState();
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState({});
    const [showMessage, setShowMessage] = useState(false);
    const [form] = Form.useForm();
    const { mode, open, close, group, reloadSearch } = props;
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };
    const statusOptions = [
        {
            value: 'active',
            name: 'Activo'
        },
        {
            value: 'inactive',
            name: 'Inactivo'
        }
    ];

    useEffect(() => {
        getUsersForGroups().then((result) => {
            if (result.success) {
                setUserList(result.users)
            }
        })
    }, [])

    useEffect(() => {
        if (group)
            form.setFieldsValue({
                name: group.name,
                status: group.status,
                members: group.groupMembers.map(item => item.key),
                adminMembers: group.groupMembers.filter(item => item.isAdmin).map(admin => admin.key)
            });
        else
            form.setFieldsValue({
                name: undefined,
                status: undefined,
                members: undefined,
                adminMembers: undefined
            });
        buildAdminMembersOptions();
    }, [group])

    function handleSubmit(values) {
        if (!values.adminMembers || values.adminMembers.every(admin => values.members.includes(admin))) {
            if (mode === 'add') {
                createGroup(values).then((result) => {
                    handleResponse(result);
                })
            }
            else if (mode === 'update') {
                values.id = group.id
                updateGroup(values).then((result) => {
                    handleResponse(result);
                })
            }
        }
        else {
            setMessage({
                title: 'Entrada inválida',
                description: 'Todos los administradores deben ser miembros del grupo',
                type: 'validate'
            });
            setShowMessage(true);
        }
    }

    function handleResponse(result) {
        if (!result.success) {
            setSuccess(false);
            if (!result.validate) {
                setMessage({
                    title: 'Algo salió mal',
                    description: 'Inténtelo de nuevo',
                    type: 'validate'
                });
                setShowMessage(true);
            }
            else {
                setMessage({
                    title: 'El nombre de grupo ya está en uso',
                    description: 'Debe ingresar otro nombre de grupo',
                    type: 'validate'
                });
                setShowMessage(true);
            }
        }
        else {
            if (mode === 'add') {
                setMessage({
                    title: 'Grupo creado',
                    description: 'El grupo fue creado con éxito',
                    type: 'success'
                });
            } else if (mode === 'update') {
                setMessage({
                    title: 'Grupo modificado',
                    description: 'Se han guardado los datos con éxito',
                    type: 'success'
                })
            }
            setShowMessage(true);
            setSuccess(true);
            reloadSearch();
        }
    }

    function buildAdminMembersOptions() {
        setAdminMembersOptions((form.getFieldValue("members") || []).map(key => <Option key={key} value={key}>{userList.filter(u => u.key === key)[0].completeName}</Option>));
    }

    return (
        <>
            <Modal
                title="Grupo"
                visible={open}
                closable={false}
                width={800}
                okText="Confirmar"
                okButtonProps={{ form: 'groupForm', key: 'submit', htmlType: 'submit' }}
                cancelText="Cancelar"
                onCancel={close}
                destroyOnClose={true}
                maskClosable={false}
                keyboard={false}
            >
                <Col offset={4} style={{ marginBlockEnd: "1%" }}>
                    <Text type="secondary">Los campos marcados con * son requeridos.</Text>
                </Col>
                <Form {...layout}
                    name="groupForm"
                    form={form}
                    layout="horizontal"
                    onFinish={handleSubmit}
                    onFieldsChange={field => {
                        if (field[0].name[0] === 'members')
                            buildAdminMembersOptions()
                    }}
                >
                    <Form.Item
                        label="Estado"
                        name="status"
                    >
                        <Select disabled={mode === 'add'}>
                            {statusOptions.map(item => (<Option key={item.value} value={item.value}>{item.name}</Option>))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Nombre"
                        name="name"
                        rules={[{ required: true, message: 'El nombre es requerido.' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Miembros"
                        name="members"
                    >
                        <Select
                            mode="multiple"
                            showArrow
                        >
                            {userList.map(i => <Option key={i.key} value={i.key}>{i.completeName}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Administradores"
                        name="adminMembers"
                    >
                        <Select
                            mode="multiple"
                            showArrow
                        >
                            {adminMembersOptions}
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