import { LeftCircleOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, Divider, Form, Input, Row, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import MessageModal from '../common/messageModal';
import { changePassword } from '../services/accountService';
import './account.css';
import * as d from '../AppConsts.json';

export default function ChangePassword(props) {
    const history = useHistory();
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState({});
    const [showMessage, setShowMessage] = useState(false);
    const { user, userLogOut } = props;
    const { Title, Text } = Typography;

    function onFinish(values) {
        values.id = user.id;
        changePassword(values)
            .then(result => {
                if (result.success) {
                    setMessage({
                        title: 'Se cambió la contraseña con éxito',
                        description: 'Se procederá a cerrar sesión',
                        type: 'success'
                    })
                    setSuccess(true)
                }
                else {
                    setMessage({
                        title: 'Error',
                        description: (d.errorCodes[result.message] || 'Hubo un error al cambiar la contraseña'),
                        type: 'validate'
                    })
                    setSuccess(false)
                }
                setShowMessage(true);
            })
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item>{user.name}</Breadcrumb.Item>
                <Breadcrumb.Item>Gestión de cuenta</Breadcrumb.Item>
                <Breadcrumb.Item>Cambiar contraseña</Breadcrumb.Item>
            </Breadcrumb>
            <div className="navigation">
                <Row>
                    <Col flex="1 0 25%">
                        <Tooltip title="Atrás">
                            <LeftCircleOutlined style={{ fontSize: "200%" }} onClick={() => { history.goBack() }} />
                        </Tooltip>
                    </Col>
                </Row>
            </div>
            <Row>
                <Col offset={8} span={8} className="change-password">
                    <Title level={2} style={{ marginBlockEnd: "0px" }}>Cambiar contraseña</Title>
                    <Divider />
                    <div className="text" >
                        <Text>Ingrese su contraseña actual, seguida de una contraseña nueva para su cuenta repetida dos veces. Luego presione <i>Cambiar contraseña</i> para continuar.</Text>
                    </div>
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Contraseña actual"
                            name="currentPassword"
                            rules={[{ required: true, message: 'Ingrese su contraseña actual' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Nueva contraseña"
                            name="newPassword"
                            rules={[
                                { required: true, message: 'Ingrese su contraseña nueva' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (getFieldValue('currentPassword') !== value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('No puede usar esta contraseña'));
                                    },
                                })
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Repita la contraseña"
                            name="repeatNew"
                            rules={[
                                { required: true, message: 'Repita su contraseña nueva' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Las contraseñas no coinciden'));
                                    },
                                })
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Cambiar contraseña
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <MessageModal
                type={message.type}
                title={message.title}
                description={message.description}
                visible={showMessage}
                onClose={() => {
                    setShowMessage(false)
                    if (success)
                        userLogOut();
                }}
            />
        </>
    )
}