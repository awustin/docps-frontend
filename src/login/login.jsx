import { Button, Col, Divider, Form, Input, Row, Spin, Typography } from 'antd';
import React from 'react';
import * as d from '../AppConsts.json';

const { Title } = Typography;
const layout = {
    labelCol: {
        span: 20,
        offset: 2
    },
    wrapperCol: {
        span: 20,
        offset: 2
    },
}
const tailLayout = {
    wrapperCol: {
        span: 20,
        offset: 2
    }
}

export default function Login(props) {
    const { loading, error, logIn } = props;

    function onFinish(values) {
        logIn({
            username: values.username,
            password: values.password
        })
    }

    return (
        <div className="login-container">
            <div className="login-pane">
                <div className="login-header">
                    <Title level={1} className="fancy-title">DocPS</Title>
                    <Title level={5} className="fancy-subtitle">Documentación de las pruebas de software</Title>
                    <Divider />
                </div>
                <Spin spinning={loading} size="large">
                    <Form
                        {...layout}
                        name="login"
                        className="login-form"
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Nombre de usuario"
                            name="username"
                            rules={[{ required: true, message: 'Usuario vacío' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Contraseña"
                            name="password"
                            rules={[{ required: true, message: 'Contraseña vacía' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button className="login-button" type="primary" htmlType="submit">Iniciar sesión</Button>
                        </Form.Item>
                    </Form>
                </Spin>
                {(error) ?
                    <Row>
                        <Col offset={2} span={20} className="login-error">
                            {d.errorCodes[error]}
                        </Col>
                    </Row>
                    : <></>
                }
            </div>
        </div>
    );
}