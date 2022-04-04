import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import MessageModal from '../common/messageModal';
import { createUser, updateUser } from '../services/usersService';
import * as validations from './validations.json';

export default function UserForm(props) {
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState({});
    const [showMessage, setShowMessage] = useState(false);
    const { mode, open, close, user, reloadSearch } = props;
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
                        label="Nombre"
                        name="name"
                        rules={validations.name}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Apellido"
                        name="lastname"
                        rules={validations.lastname}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Correo electrónico"
                        name="email"
                        rules={validations.email}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Nombre de usuario"
                        name="username"
                        rules={validations.username}
                    >
                        <Input placeholder="Escriba un nombre de usuario" />
                    </Form.Item>
                    {(mode === 'add') ?
                        <Form.Item
                            label="Contraseña"
                            name="password"
                            rules={validations.password}
                        >
                            <Input.Password
                                placeholder="Escriba una contraseña"
                            />
                        </Form.Item> : <></>
                    }
                    <Form.Item
                        label="D.N.I."
                        name="dni"
                        rules={validations.dni}
                    >
                        <Input placeholder="Ingrese el DNI sin puntos" />
                    </Form.Item>
                    <Form.Item
                        label="Calle"
                        name="street"
                        rules={validations.street}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Número"
                        name="streetNumber"
                        rules={validations.streetNumber}
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
                        rules={validations.job}
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