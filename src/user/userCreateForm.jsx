import { withRouter } from "react-router";
import React from 'react';
import { 
    Row,
    Col,
    Breadcrumb,
    Typography,
    Divider,
    Modal,
    Form,
    Input,
    Button,
    Alert,
    message
} from 'antd';
import {
    ExclamationCircleOutlined,
} from '@ant-design/icons';

class UserCreateForm extends React.Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.showAlerts = this.showAlerts.bind(this)
    }
    state = { 
        cancelModalvisible: false,
        validationMessage: undefined,
    };

    handleSubmit(values) {
        console.log(values)
        //Validar correo único
        this.setState({ validationMessage: {title:'El correo electrónico ya está en uso',description:'Debe ingresar otra dirección de correo electrónico'} })
        //Validar nombre de usuario único
        this.setState({ validationMessage: {title:'El nombre de usuario ya existe',description:'Debe ingresar otro nombre de usuario'} })        
        //Query para hacer el insert del usuario
        //Enviar el mail de verificacion al usuario nuevo
        message.success('Se ha enviado un mail de verificación al correo electrónico ingresado.')
    }

    showAlerts() {
        const { validationMessage } = this.state
        if(validationMessage !== undefined)
        {
            return(
                <Alert
                message={validationMessage.title}
                description={validationMessage.description}
                type="error"
                showIcon
                />
            )
        }
    }

    render() {
        const { cancelModalvisible } = this.state
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
                        name="email"
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
                        <Button htmlType="button" onClick={() => { this.setState({cancelModalvisible:true}) }} style={{ margin: '0 8px' }}>Cancelar</Button>
                    </Form.Item>
                </Form>
                <div className="alerts-container">
                    {this.showAlerts()}
                </div>
            </div>
            <Modal
                visible={cancelModalvisible}
                closable={false}
                width={300}
                onOk={() => { 
                    this.setState({cancelModalvisible:false}) 
                    this.props.history.push('/user')
                }}
                onCancel={() => { this.setState({cancelModalvisible:false}) }}
                okText="Salir"
                cancelText="Cancelar"
            >
            <Row>
                <Col flex="1 0 20%" style={{ textAlign:"center", fontSize:"160%", alignItems: "center" }}>
                <ExclamationCircleOutlined style={{color:"#ffc02e"}} />
                </Col>
                <Col flex="1 0 80%" style={{ textAlign: "start", alignSelf: "center" }}>
                ¿Salir de la creación del usuario?
                </Col>
            </Row>
            </Modal>
            </>
        );
    }
}

export default withRouter(UserCreateForm);