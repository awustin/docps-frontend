import {
    Form, Input, Modal, Select
} from 'antd';
import React, { useState } from 'react';
import MessageModal from '../common/messageModal';
import {
    createUser,
    updateUser
} from '../services/usersService';

const { Option } = Select

export default function UserForm(props) {
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState({});
    const [showMessage, setShowMessage] = useState(false);
    const { mode, open, close, user, reloadSearch } = props;
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
    const layout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 12 },
    };

    function handleSubmit(values) {
        if (mode === 'add') {
            createUser(values).then((result) => {
                handleResponse(result);
            })
        }
        else if (mode === 'update') {
            if (user.status === 'inactive' && values.status === 'active')
                values.activateUser = true;
            values.id = user.id
            updateUser(values).then((result) => {
                handleResponse(result);
            })
        }
    }

    function handleResponse(result) {
        if (!result.success) {
            setSuccess(false);
            if (!result.validate) {
                setMessage({
                    title: 'El correo electrónico ya está en uso',
                    description: 'Debe ingresar otra dirección de correo electrónico',
                    type: 'validate'
                });
                setShowMessage(true);
            }
            else {
                switch (result.validate) {
                    case 'EXISTING EMAIL':
                        setMessage({
                            title: 'El correo electrónico ya está en uso',
                            description: 'Debe ingresar otra dirección de correo electrónico',
                            type: 'validate'
                        });
                        setShowMessage(true);
                        break;
                    case 'EXISTING NAME':
                        setMessage({
                            title: 'El nombre de usuario ya está en uso',
                            description: 'Debe ingresar otro nombre de usuario',
                            type: 'validate'
                        });
                        setShowMessage(true);
                        break;
                    default:
                        setMessage({
                            title: 'Algo salió mal',
                            description: '',
                            type: 'validate'
                        });
                        setShowMessage(true);
                        break;
                }
            }
        }
        else {
            if (mode === 'add') {
                setMessage({
                    title: 'Usuario creado',
                    description: 'Se envió un mail de verificación al correo ingresado',
                    type: 'success'
                });
            } else if (mode === 'update') {
                setMessage({
                    title: 'Usuario modificado',
                    description: 'Se han guardado los datos con éxito',
                    type: 'success'
                })
            }
            setShowMessage(true);
            setSuccess(true);
            reloadSearch();
        }
    }

    return (
        <>
            <Modal
                title="Usuario"
                visible={open}
                closable={false}
                width={700}
                okText="Confirmar"
                okButtonProps={{ form: 'userForm', key: 'submit', htmlType: 'submit' }}
                cancelText="Cancelar"
                onCancel={close}
                destroyOnClose={true}
                maskClosable={false}
                keyboard={false}
            >
                <Form {...layout}
                    name="userForm"
                    id="userForm"
                    layout="horizontal"
                    onFinish={handleSubmit}
                    initialValues={
                        (user) ?
                            {
                                status: user.status,
                                name: user.name,
                                lastname: user.lastname,
                                email: user.email,
                                username: user.username,
                                dni: user.dni,
                                street: user.street,
                                streetNumber: user.streetNumber,
                                addressExtra: user.addressExtra,
                                job: user.job
                            } :
                            {}
                    }
                >
                    <Form.Item
                        label="Estado"
                        name="status"
                    >
                        <Select
                            disabled={mode === 'add'}
                        >
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
                        label="Apellido"
                        name="lastname"
                        rules={[{ required: true, message: 'El apellido es requerido.' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Correo electrónico"
                        name="email"
                        rules={[{ required: true, type: "email", message: 'Debe ingresar un correo electrónico válido.' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Nombre de usuario"
                        name="username"
                        rules={[{ required: true, message: 'Debe ingresar un nombre de usuario válido.' }]}
                    >
                        <Input placeholder="Escriba un nombre de usuario" />
                    </Form.Item>
                    <Form.Item
                        label="Contraseña"
                        name="password"
                        rules={[{ required: mode === 'add', message: 'Debe ingresar una contraseña válida.' }]}
                    >
                        <Input.Password
                            disabled={mode === 'update'}
                            placeholder="Escriba una contraseña"
                        />
                    </Form.Item>
                    <Form.Item
                        label="D.N.I."
                        name="dni"
                    >
                        <Input placeholder="Ingrese el DNI sin puntos" />
                    </Form.Item>
                    <Form.Item
                        label="Calle"
                        name="street"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Número"
                        name="streetNumber"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Información del domicilio"
                        name="addressExtra"
                    >
                        <Input placeholder="Escriba información adicional del domicilio" />
                    </Form.Item>
                    <Form.Item
                        label="Puesto"
                        name="job"
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