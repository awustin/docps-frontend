import { withRouter } from "react-router";
import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Row,
    Col,
    Breadcrumb,
    Typography,
    Divider,
    Select,
    Form,
    Input,
    Button,
    message
} from 'antd';
import {
    PlusCircleOutlined,
    EditOutlined,
    SearchOutlined
} from '@ant-design/icons';

class UserCreateForm extends React.Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(values) {
        console.log(values)
        //Validar nombre de usuario único
        //Validar correo único
        //Query para hacer el insert del usuario
        //Enviar el mail de verificacion al usuario nuevo
        message.success('Se ha enviado un mail de verificación al correo electrónico ingresado.')
    }

    render() {
        const { user } = this.props
        const { Title } = Typography
        const layout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        }
        const tailLayout = {
          wrapperCol: { offset: 7, span: 12 },
        }
        
        return(
            <>
            <Breadcrumb>
                <Breadcrumb.Item>Usuario</Breadcrumb.Item>
                <Breadcrumb.Item>{user.id}</Breadcrumb.Item>
                <Breadcrumb.Item>Crear usuario</Breadcrumb.Item>
            </Breadcrumb>            
            <div className="create-user-form-container" style={{margin: "50px"}}>
                <Title level={3}>Crear usuario</Title>
                <Divider/>
                <Form {...layout}
                    name="createUserForm"
                    layout="horizontal"
                    onFinish={this.handleSubmit}
                >
                    <Form.Item 
                        label="Nombre"
                        name="name"
                        rules={[{ required: true, message: 'El nombre es requerido.' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item 
                        label="Apellido"
                        name="last-name"
                        rules={[{ required: true, message: 'El apellido es requerido.' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item 
                        label="Correo electrónico"
                        name="e-mail"
                        rules={[{ required: true, type: "email", message: 'Debe ingresar un correo electrónico válido.' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item 
                        label="Nombre de usuario"
                        name="username"
                        rules={[{ required: true, message: 'Debe ingresar un nombre de usuario válido.' }]}
                    >
                        <Input placeholder="Escriba un nombre de usuario"/>
                    </Form.Item>
                    <Form.Item 
                        label="Contraseña"
                        name="password"
                        rules={[{ required: true, message: 'Debe ingresar una contraseña válida.' }]}
                    >
                        <Input.Password placeholder="Escriba una contraseña" />
                    </Form.Item>
                    <Form.Item 
                        label="D.N.I."
                        name="personal-id"
                    >
                        <Input placeholder="Ingrese el DNI sin puntos"/>
                    </Form.Item>
                    <Form.Item 
                        label="Calle"
                        name="street"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item 
                        label="Número"
                        name="street-number"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item 
                        label="Información del domicilio"
                        name="address-extra"
                    >
                        <Input placeholder="Escriba información adicional del domicilio"/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">Crear</Button>
                        <Button htmlType="button" onClick={() => this.props.history.push('/user')} style={{ margin: '0 8px' }}>Cancelar</Button>
                    </Form.Item>
                </Form>                
            </div>
            </>
        );
    }
}

export default withRouter(UserCreateForm);